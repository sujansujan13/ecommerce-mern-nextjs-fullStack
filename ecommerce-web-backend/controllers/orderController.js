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
  // 1. Initialize an isolated multi-document session transaction
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // input
    const userId = req.user.id;
    console.log(userId);

    const { shippingAddress, paymentGateway } = req.body;
    console.log(shippingAddress, paymentGateway);

    if (!shippingAddress || !paymentGateway) {
      throw new Error("Missing Shipping Address or payment gateway");
    }

    const cart = await Cart.findOne({ userId })
      .populate("items.productId")
      .session(session);

    if (!cart || cart.items.length === 0) {
      throw new Error("Cannot place Order. Shopping Cart is Empty");
    }

    let calculatedSubTotal = 0;

    // #Doubt# → resolved: this stores final immutable order snapshot
    const orderItemsProcessed = [];

    // 3. Inventory allocation + stock validation
    for (const item of cart.items) {
      const productData = item.productId;
      const checkoutQty = item.quantity;

      if (!productData) {
        throw new Error("One or more items in your cart no longer exist.");
      }

      // Atomic stock update (prevents overselling)
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
          `Insufficient stock for ${productData.name}. Please update your cart.`,
        );
      }

      // Compile order structure items snapshot arrays
      calculatedSubTotal += updatedProduct.price * checkoutQty;

      orderItemsProcessed.push({
        productId: updatedProduct._id,
        name: updatedProduct.name,
        quantity: checkoutQty,
        priceSnapshot: updatedProduct.price,
      });
    }

    // 5. Server-side ledger math configurations
    const shippingFee = calculatedSubTotal > 0 ? 150 : 0;
    const discountAmount = calculatedSubTotal > 10000 ? 500 : 0;
    const grandTotal = calculatedSubTotal + shippingFee - discountAmount;

    // 6. Instantiate new record document frame mappings
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
        status: paymentGateway === "cod" ? "pending" : "pending",
      },
    });

    await finalOrder.save({ session });

    // 7. Clear out the database shopping cart now that items are safely allocated
    await Cart.findOneAndUpdate(
      { userId },
      { $set: { items: [] } },
      { session },
    );

    // 8. Commit the multi-document transaction block to database storage
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
    // Abort transaction safely
    await session.abortTransaction();

    console.error("Order processing encountered an error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "An internal error occurred while processing your order.",
    });
  } finally {
    // Always close session
    session.endSession();
  }
};

/**
 * @desc    Retrieves order history list records for user dash layouts
 * @route   GET /api/orders/my-orders
 * @access  Private
 */

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.log("Error retrieving the order from the DB", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve order history.",
    });
  }
};
