const mongoose = require("mongoose");
const { randomBytes } = require("crypto");

const OrderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  // #WHAT&WHY#:priceSnapshot
  priceSnapshot: { type: Number, required: true }, // 🧠 CRITICAL: Locks the price at the exact moment of purchase
  image: String,
  sku: String, // for future variant purpose
});

const OrderSchema = new mongoose.Schema(
  {
    item: [OrderItemSchema],

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      // #IMP#:index:true
      index: true, //Speeds up the user order history queries
    },

    shippingAddress: {
      fullName: { type: String, required: true, trim: true }, //trim removes spaces from start and finish
      phoneNumber: { type: String, required: true, trim: true },
      district: { type: String, required: true, lowercase: true },
      municipality: { type: String, required: true, trim: true },
      streetAddress: { type: String, required: true, trim: true },
    },

    pricing: {
      subTotal: { type: Number, required: true },
      shippingFee: { type: Number, required: true, default: 0 },
      // #QUE#: why required:true if it is not being assigned to a product
      discountAmout: { type: Number, required: true, default: 0 },
      grandTotal: { type: Number, required: true },
      currency: {
        type: String,
        required: true,
        default: "NPR",
        uppercase: true,
      },
    },

    paymentDetails: {
      gateway: {
        type: String,
        enum: ["esewa", "khalti", "cod"],
        required: true,
      },
      status: {
        type: string,
        enum: ["pending", "completed", "failed", "refunded"],
        default: "pending",
      },
      transactionId: { type: String, default: null }, // returned by digital gateways
      paidAt: { type: Date, default: null }, //useful for reports, refunds and all
    },

    orderStatus: {
      type: String,
      enum: ["placed", "processing", "shipped", "delivered", "cancelled"],
      default: "placed",
      // #WHY#->index:true
      index: true,
    },

    // 👇 Lifecycle timestamps
    shippedAt: {
      type: Date,
      default: null,
    },
    deliveredAt: {
      type: Date,
      default: null,
    },
    cancelledAt: {
      type: Date,
      default: null,
    },

    cancellationReason: {
      type: String,
      default: null,
    },

    statusHistory: [
      {
        status: {
          type: String,
          enum: ["placed", "processing", "shipped", "delivered", "cancelled"],
        },
        changedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // #WHY# -> index:true
    // #DOUBT# -> default: () => { const random = randomBytes(4).toString("hex").toUpperCase()return `HTM-${random}`; }
    trackingId: {
      type: String,
      index: true,
      unique: true,
      default: () => {
        const random = randomBytes(4).toString("hex").toUpperCase();
        return `HTM-${random}`;
      }, // Generates readable tracker IDs
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", OrderSchema);

// DONE IN CONTROLLER
// OrderSchema.pre("save", function (next) {
//   this.pricing.subtotal = this.items.reduce((acc, item) => {
//     return acc + item.priceSnapshot * item.quantity;
//   }, 0);

//   this.pricing.grandTotal =
//     this.pricing.subtotal +
//     this.pricing.shippingFee -
//     this.pricing.discountAmount;

//   next();
// });
