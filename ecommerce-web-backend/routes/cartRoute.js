const express = require("express");
const {
  addToCart,
  removeFromCart,
  updateQuantity,
  getCart,
} = require("../controllers/cartController");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.get("/", getCart);

router.post("/add", addToCart);

router.put("/update", updateQuantity);

// #COMMON-MISTAKE# -> NEVER forget to add :params when using params to receive request and send response
router.delete("/remove/:productId", removeFromCart);

// router.get("/debug/check-user", async (req, res) => {
//   try {
//     // Your protect middleware runs first
//     const userId = req.user.userId || req.user.Id || req.user.id;

//     // Find all carts in database
//     const allCarts = await Cart.find({}).populate("userId", "email name");

//     res.json({
//       currentUser: {
//         fromToken: req.user,
//         extractedUserId: userId,
//       },
//       allCartsInDatabase: allCarts.map((cart) => ({
//         cartId: cart._id,
//         userId: cart.userId,
//         userIdToString: cart.userId.toString(),
//         itemCount: cart.items.length,
//         items: cart.items,
//       })),
//       matchingCart: await Cart.findOne({ userId: userId }),
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

module.exports = router;
