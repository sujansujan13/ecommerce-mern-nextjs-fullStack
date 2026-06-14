const Cart = require("../models/Cart");
const Product = require("../models/product");

const findAndPopulateCart = async (userId) => {
  return await Cart.findOne({ userId: userId }).populate({
    path: "items.productId",
    select:
      "name price oldPrice images description stockCount currency inStock",
  });
};

const cleanupInvalidItems = async (userId) => {
  const cart = await Cart.findOne({ userId: userId });
  if (!cart || !cart.items || cart.items.length === 0) return null;

  // Get all product IDs from cart
  const productIds = cart.items
    .map((item) => item.productId)
    .filter((id) => id !== null);

  if (productIds.length === 0) return cart;

  // Find which products exist
  const existingProducts = await Product.find({
    _id: { $in: productIds },
  });

  // ⚠️ CRITICAL SAFETY CHECK: If we found 0 products but the cart had items,
  // it means our Product model query failed or isn't connecting right.
  // DO NOT clear the cart in this case!
  if (existingProducts.length === 0 && productIds.length > 0) {
    console.warn(
      "⚠️ Warning: Product lookup returned zero results. Skipping cleanup to protect data.",
    );
    return cart;
  }

  const existingProductIds = existingProducts.map((p) => p._id.toString());

  // Keep only items with valid products
  const validItems = cart.items.filter(
    (item) =>
      item.productId && existingProductIds.includes(item.productId.toString()),
  );

  if (validItems.length !== cart.items.length) {
    const removedCount = cart.items.length - validItems.length;
    cart.items = validItems;
    await cart.save();
    console.log(
      `🧹 Cleaned up ${removedCount} invalid/deleted items from user cart.`,
    );
  }

  return cart;
};

const addToCart = async (req, res) => {
  try {
    // 🔍 DEBUG: See what the auth middleware attached
    console.log("req.user:", req.user);
    // Step 1: Get data from request body
    const { productId, quantity = 1 } = req.body;

    // ✅ Validate product exists before adding
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found. Cannot add to cart.",
      });
    }
    // Step 2: Get authenticated user's ID
    const userId = req.user?.userId || req.user?.Id || req.user?.id;

    console.log("Extracted userId:", userId); // 🔍 DEBUG

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication error: User ID could not be determined.",
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "The quantity must not be less than 1",
      });
    }

    // Step 3: Find user's cart
    let cart = await Cart.findOne({ userId: userId });
    // Step 4: If no cart exists, create one
    if (!cart) {
      // If no cart exists, create it cleanly
      cart = await Cart.create({
        userId: userId,
        items: [{ productId: productId, quantity }],
      });
    } else {
      // Step 5: Check if product already in cart
      // Step 5: Check if product already in cart safely
      const existingItem = cart.items.find((item) => {
        if (!item.productId) return false;

        // Extract the plain string ID whether it's an object or a string raw ID
        const currentId = item.productId._id
          ? item.productId._id.toString()
          : item.productId.toString();
        return currentId === productId.toString();
      });

      if (existingItem) {
        // Update quantity if found
        existingItem.quantity += quantity;
      } else {
        // Push a clean object structure if new
        cart.items.push({ productId: productId, quantity });
      }

      await cart.save();
    }
    // FIX: Populate the cart details before sending it back so frontend doesn't break
    const populatedCart = await findAndPopulateCart(userId);
    console.log("Populated cart:", JSON.stringify(populatedCart, null, 2));

    return res.status(200).json({
      success: true,
      cart: populatedCart,
    });
  } catch (error) {
    console.error("Add To Cart Fatal Server Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 2. UPDATE QUANTITY (Explicitly sets an item count - Perfect for + / - buttons)
const updateQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.userId || req.user.Id || req.user.id;

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "The quantity must not be less than 1",
      });
    }

    const cart = await Cart.findOneAndUpdate(
      {
        userId: userId,
        "items.productId": productId,
      },
      // The $set operator replaces the old quantity with the new one. It doesn't increment or decrement — it directly sets the value to whatever the frontend sends.
      { $set: { "items.$.quantity": quantity } },
      // { new: true }, DEPRECATED
      { returnDocument: "after" },
    );

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart or item not found",
      });
    }

    const populatedCart = await findAndPopulateCart(userId);

    return res.status(200).json({
      success: true,
      cart: populatedCart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 3. REMOVE FROM CART (For the trashcan delete icon)
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params; // or req.body
    const userId = req.user.userId || req.user.Id || req.user.id;

    const cart = await Cart.findOneAndUpdate(
      {
        userId: userId,
      },
      { $pull: { items: { productId: productId } } },
      { new: true },
    );

    const populatedCart = await findAndPopulateCart(userId);

    return res.status(200).json({
      success: true,
      cart: populatedCart,
      message: "Item removed from cart",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 4. GET CART (Fetches user cart safely)
const getCart = async (req, res) => {
  try {
    console.log("Full req.user object:", req.user);
    console.log("req.user.userId:", req.user.userId);
    console.log("req.user.id:", req.user.id);
    console.log("req.user._id:", req.user._id);

    // ✅ ADD THIS LINE - Extract userId from the authenticated user
    const userId = req.user.userId || req.user.Id || req.user.id;

    // ❌ Missing: Check if userId exists
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }

    // Clean up invalid items first
    await cleanupInvalidItems(userId);

    const cart = await findAndPopulateCart(userId);

    if (!cart) {
      return res.status(200).json({ success: true, cart: { items: [] } });
    }

    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    // Log the real error for debugging
    console.log("Get Cart Error:", error);
    // Return generic message to client
    return res.status(500).json({
      success: false,
      cart: null,
      message: "Failed to fetch cart. Please try again.",
    });
  }
};

module.exports = {
  addToCart,
  updateQuantity,
  removeFromCart,
  getCart,
};

// const findAndPopulateCart = async (userId) => {
// 1. Find ONE cart where 'user' field matches the userId
// return await Cart.findOne({ user: userId })
// 2. Replace product IDs with actual product documents
//     .populate({
//       path: "items.product",              // Which field to populate
//       select: "name price oldPrice image description stock"  // Which fields to fetch
//     });
// };
