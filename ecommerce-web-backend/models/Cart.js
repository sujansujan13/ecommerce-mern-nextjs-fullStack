const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product", // The ref must match the model name exactly as previously created
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity cannot be less than 1"],
    default: 1,
  },
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // One unique cart per system customer profile
    },
    items: [cartItemSchema],
  },
  { timestamps: true },
);

// Optional: Virtual property to compute total item metrics automatically if needed on document instantiation
cartSchema.virtual("totalItems").get(function () {
  return this.items.reduce((acc, item) => acc + item.quantity, 0);
});

// export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);

module.exports = mongoose.model("Cart", cartSchema);

// VIRTUAL = A Property That Doesn't Exist in the Database
// It's a fake/synthetic/computed field that exists only in your application code, not in MongoDB.

// USE OF VIRTUAL
// Start:        acc = 0
// Item 1:       acc = 0 + 2 = 2
// Item 2:       acc = 2 + 1 = 3
// Item 3:       acc = 3 + 5 = 8
// Result:       8
