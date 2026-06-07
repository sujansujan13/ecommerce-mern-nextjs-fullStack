export interface ProductType {
  _id: string;

  // core identity
  name: string;
  slug: string;
  description: string;

  // Pricing
  price: number;
  oldPrice?: number;
  currency: "NPR" | "USD" | "INR";

  // Media
  images: string[]; // ALWAYS array (critical for consistency)

  // Classification
  category?: string;
  subCategory?: string;
  tags?: string[];

  // Brand & origin
  brand?: string;
  originRegion?: string;

  // Ratings & social proof
  rating: number; // 0 - 5
  reviewsCount: number;

  // Inventory
  inStock?: boolean;
  stockCount?: number;

  // Shipping / product info
  weight?: string;
  warranty?: string;

  // UI helpers
  badge?: "NEW" | "HOT" | "SALE" | "BEST SELLER" | string;
  isFeatured?: boolean;

  // Variants (important for real ecommerce scaling)
  variants?: {
    name: string; // e.g. Color / Size
    options: string[]; // e.g. ["Red", "Blue"]
  }[];

  // Specifications (for electronics, etc.)
  attributes?: ProductAttribute[];

  // Timestamps (production standard)
  createdAt?: string;
  updatedAt?: string;

  image?: string;
}

// Dynamic structural sub-component layout target block setup
export interface ProductAttribute {
  key: string;
  name: string;
  value: string;
}
