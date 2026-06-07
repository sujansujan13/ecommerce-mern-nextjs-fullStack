const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // Identity
    // trim only looks at the "outside" edges of a string; it ignores the normal spaces between words.
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },

    description: { type: String, required: true },

    // Pricing
    // your schema would technically allow a malicious or accidental entry of a negative price (e.g., price: -50). Prevent this with min:
    price: { type: Number, required: true, min: 0 },
    oldPrice: { type: Number, min: [0, "Old Price cannot be negative"] },
    currency: { type: String, enum: ["NPR", "USD", "INR"], default: "NPR" },

    // Media
    images: {
      type: [String],
      default: [],
    },

    // Classification
    category: { type: String, required: true },
    subCategory: String,
    tags: [String],

    // Branding
    brand: String,
    originRegion: String,

    // Ratings
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Inventory
    inStock: {
      type: Boolean,
      default: true,
    },
    stockCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Extra Info
    weight: String,
    warranty: String,

    badge: String,
    isFeatured: {
      type: Boolean,
      default: false,
    },

    // Variants
    variants: [
      {
        name: String,
        options: [String],
      },
    ],

    attributes: [
      {
        key: String,
        name: String,
        value: String,
      },
    ],
  },
  { timestamps: true },
);

/* ----------------------------------------------------
   TEXT SEARCH INDEX (FAST + SCALABLE)
   Use this for production search
---------------------------------------------------- */
productSchema.index({
  name: "text",
  description: "text",
  category: "text",
  subCategory: "text",
  tags: "text",
  brand: "text",
});

productSchema.index({ slug: 1 }); // For fast lookups by slug
productSchema.index({ category: 1 }); // For category-based queries
productSchema.index({ price: 1 }); // For price range queries
productSchema.index({ rating: -1 }); // For sorting by rating

module.exports = mongoose.model("product", productSchema);
