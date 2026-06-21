const mongoose = require("mongoose");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/product");

/**
 * @desc    Atomically processes checkout and creates a new order
 * @route   POST /api/orders/create
 * @access  Private
 */

exports.createOrder = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // input
    const userId = req.user.id;
    const { shippingAddress, paymentGateway, selectedItems } = req.body;

    console.log(userId);
    console.log(shippingAddress, paymentGateway);

    if (!shippingAddress || !paymentGateway) {
      throw new Error("Missing Shipping Address or payment gateway");
    }

    // fetch cart
    const cart = await Cart.findOne({ userId })
      .populate("items.productId")
      .session(session);

    if (!cart || cart.items.length === 0) {
      throw new Error("Cannot place Order. Shopping Cart is Empty");
    }

    /**
     * 🧠 NEW: supports partial checkout
     * If selectedItems is provided → only checkout those
     * Else → checkout full cart
     */
    let itemsToCheckout = cart.items;

    if (selectedItems && selectedItems.length > 0) {
      itemsToCheckout = cart.items.filter((item) =>
        selectedItems.includes(item.productId._id.toString()),
      );
    }

    if (itemsToCheckout.length === 0) {
      throw new Error("No valid items selected for checkout");
    }

    let calculatedSubTotal = 0;
    const orderItemsProcessed = [];

    // 🧠 NEW: tracks purchased items
    const purchasedProductIds = [];

    // inventory + order build
    for (const item of itemsToCheckout) {
      const productData = item.productId;
      const checkoutQty = item.quantity;

      if (!productData) {
        throw new Error("One or more items in your cart no longer exist.");
      }

      // atomic stock reservation
      const updatedProduct = await Product.findOneAndUpdate(
        {
          _id: productData._id,
          stockCount: { $gte: checkoutQty },
        },
        {
          $inc: { stockCount: -checkoutQty },
        },
        {
          new: true,
          session,
        },
      );

      if (!updatedProduct) {
        throw new Error(
          `Insufficient stock for ${productData.name}. Please update cart.`,
        );
      }

      calculatedSubTotal += updatedProduct.price * checkoutQty;

      orderItemsProcessed.push({
        productId: updatedProduct._id,
        name: updatedProduct.name,
        quantity: checkoutQty,
        priceSnapshot: updatedProduct.price,
      });

      // 🧠 NEW: track purchased items
      purchasedProductIds.push(updatedProduct._id.toString());
    }

    // pricing
    const shippingFee = calculatedSubTotal > 0 ? 150 : 0;
    const discountAmount = calculatedSubTotal > 10000 ? 500 : 0;
    const grandTotal = calculatedSubTotal + shippingFee - discountAmount;

    // create order
    const finalOrder = new Order({
      userId,
      items: orderItemsProcessed,
      shippingAddress,
      pricing: {
        subtotal: calculatedSubTotal,
        shippingFee,
        discountAmount,
        grandTotal,
        currency: "NPR",
      },
      paymentDetails: {
        gateway: paymentGateway,
        status: "pending",
      },
    });

    await finalOrder.save({ session });

    // 🧠 SMART CART UPDATE (NOT FULL WIPE)
    if (selectedItems && selectedItems.length > 0) {
      // remove only purchased items
      await Cart.updateOne(
        { userId },
        {
          $pull: {
            items: {
              productId: {
                $in: purchasedProductIds,
              },
            },
          },
        },
        { session },
      );
    } else {
      // full checkout → clear cart
      await Cart.updateOne({ userId }, { $set: { items: [] } }, { session });
    }

    await session.commitTransaction();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      orderId: finalOrder._id,
      trackingId: finalOrder.trackingId,
      paymentGateway: finalOrder.paymentDetails.gateway,
      totalAmount: grandTotal,
    });
  } catch (error) {
    await session.abortTransaction();

    console.error("Order processing error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "An internal error occurred while processing your order.",
    });
  } finally {
    session.endSession();
  }
};
