const products = [
  {
    brand: "Philips",
    name: "Smart Air Fryer",
    slug: "smart-air-fryer",
    description:
      "Digital oil-free air fryer with touch controls, pre-set smart cooking modes, and rapid air circulation technology for healthy meals.",
    price: 12000,
    currency: "NPR",
    rating: 4.2,
    reviewsCount: 1250,
    badge: "10% OFF",
    weight: "4.5kg Unit",
    images: [
      "/ElectronicsImages/air-fryer-1.jpg",
      "/ElectronicsImages/air-fryer-2.jpg",
      "/ElectronicsImages/air-fryer-3.jpg",
      "/ElectronicsImages/air-fryer-4.jpg",
    ],
    category: "electronics",
    originRegion: "Imported",
    inStock: true,
    stockCount: 1,
    warranty: "1 Year Brand Warranty",
    attributes: [
      { key: "capacity", name: "Capacity", value: "4.5 Liters" },
      { key: "wattage", name: "Power Consumption", value: "1500W" },
      {
        key: "control_type",
        name: "Control Panel",
        value: "Digital LED Touchscreen",
      },
      { key: "temp_range", name: "Temperature Range", value: "80°C to 200°C" },
    ],
  },
  {
    brand: "Sony",
    name: "Quantum Sound Wireless Headphones",
    slug: "quantum-sound-headphones",
    description:
      "Premium over-ear wireless headphones featuring hybrid active noise cancellation (ANC), crystal-clear high-res audio, and a 40-hour battery life.",
    price: 18500,
    isFeatured: true,
    currency: "NPR",
    rating: 4.7,
    reviewsCount: 840,
    weight: "260g Unit",
    images: [
      "/ElectronicsImages/headphones-1.avif",
      "/ElectronicsImages/headphones-2.avif",
      "/ElectronicsImages/headphones-3.avif",
      "/ElectronicsImages/headphones-4.avif",
    ],
    category: "electronics",
    originRegion: "Imported",
    inStock: true,
    stockCount: 18,
    warranty: "6 Months Replacement Warranty",
    attributes: [
      {
        key: "battery_life",
        name: "Battery Life",
        value: "Up to 40 Hours (ANC Off)",
      },
      {
        key: "connectivity",
        name: "Bluetooth Version",
        value: "Bluetooth 5.3",
      },
      {
        key: "anc_depth",
        name: "Noise Cancellation",
        value: "Hybrid ANC up to -40dB",
      },
      {
        key: "driver_size",
        name: "Audio Driver",
        value: "40mm Dynamic Drivers",
      },
    ],
  },
  {
    brand: "Keychron",
    name: "AeroTouch Mechanical Keyboard",
    slug: "aerotouch-mechanical-keyboard",
    description:
      "Compact 75% mechanical gaming keyboard with hot-swappable tactile switches, dynamic per-key RGB backlighting, and dual-mode wireless connectivity.",
    price: 9500,
    currency: "NPR",
    rating: 4.5,
    reviewsCount: 312,
    badge: "Hot Deal",
    weight: "820g Unit",
    images: [
      "/ElectronicsImages/keyboard-1.jpg",
      "/ElectronicsImages/keyboard-2.jpg",
      "/ElectronicsImages/keyboard-3.avif",
      "/ElectronicsImages/keyboard-4.avif",
    ],
    category: "electronics",
    originRegion: "Imported",
    inStock: true,
    stockCount: 8,
    warranty: "1 Year Limited Warranty",
    attributes: [
      {
        key: "layout_size",
        name: "Keyboard Layout",
        value: "75% Form Factor (84 Keys)",
      },
      {
        key: "switch_type",
        name: "Switch Type",
        value: "Hot-swappable Gateron Brown (Tactile)",
      },
      {
        key: "backlight",
        name: "RGB Lighting",
        value: "Per-Key South-facing RGB",
      },
      {
        key: "connection_modes",
        name: "Connectivity",
        value: "2.4GHz Wireless / Bluetooth 5.1 / USB-C",
      },
    ],
  },
  {
    brand: "Anker Nebula",
    name: "Apex 4K Ultra-Short Throw Projector",
    slug: "apex-4k-projector",
    description:
      "Transform your space with a smart 4K laser projector capable of casting a massive 120-inch theater screen from just inches away from the wall.",
    price: 145000,
    currency: "NPR",
    rating: 4.8,
    reviewsCount: 95,
    weight: "6.2kg Unit",
    images: [
      "/ElectronicsImages/projector-1.jpg",
      "/ElectronicsImages/projector-2.avif",
      "/ElectronicsImages/projector-3.jpg",
      "/ElectronicsImages/projector-4.jpg",
    ],
    category: "electronics",
    originRegion: "Imported",
    inStock: true,
    stockCount: 3,
    warranty: "2 Years Comprehensive Warranty",
    attributes: [
      {
        key: "resolution",
        name: "Native Resolution",
        value: "4K UHD (3840 x 2160)",
      },
      {
        key: "brightness",
        name: "Light Source Brightness",
        value: "2500 ANSI Lumens",
      },
      {
        key: "throw_ratio",
        name: "Throw Ratio",
        value: "0.23:1 Ultra-Short Throw",
      },
      {
        key: "smart_os",
        name: "Operating System",
        value: "Android TV Built-in",
      },
    ],
  },
  {
    brand: "Amazfit",
    name: "Titan Fit Pro Smartwatch",
    slug: "titan-fit-smartwatch",
    description:
      "Rugged outdoor fitness tracking smartwatch featuring an uncompressed AMOLED display, dual-band GPS tracker, and continuous blood oxygen telemetry monitoring.",
    price: 14500,
    currency: "NPR",
    rating: 4.4,
    reviewsCount: 156,
    badge: "New",
    weight: "52g Unit",
    images: [
      "/ElectronicsImages/smartwatch-1.jpg",
      "/ElectronicsImages/smartwatch-2.jpg",
    ],
    category: "electronics",
    originRegion: "Imported",
    inStock: true,
    stockCount: 22,
    warranty: "1 Year Brand Warranty",
    attributes: [
      {
        key: "display",
        name: "Display Type",
        value: "1.43-inch Always-On AMOLED",
      },
      {
        key: "water_resistance",
        name: "Waterproofing",
        value: "5ATM / 50m Depth Certified",
      },
      {
        key: "sensors",
        name: "Biometric Sensors",
        value: "Heart Rate, SpO2, Sleep Tracker, Accelerometer",
      },
      {
        key: "gps_tech",
        name: "Navigation",
        value: "Dual-Band Multi-System GNSS/GPS",
      },
    ],
  },
  {
    name: "Hand-woven Dhaka Topi",
    slug: "hand-woven-dhaka-topi",
    description:
      "Authentic, intricately hand-loomed Palpali Dhaka topi. Crafted by local artisans showcasing traditional geometric patterns and heritage.",
    price: 3500,
    oldPrice: 4200,
    currency: "NPR",
    rating: 4.8,
    reviewsCount: 124,
    badge: "HANDLOOM",
    weight: "80g",
    images: [
      "/FashionImages/dhaka-topi.jpg",
      "/FashionImages/dhaka-topi-1.jpg",
      "/FashionImages/dhaka-topi-2.jpg",
    ],
    subCategory: "Accessories",
    category: "fashion",
    originRegion: "Other", // (Palpa)
    inStock: true,
    stockCount: 15,
  },
  {
    name: "Pure Pashmina Shawl",
    slug: "pure-pashmina-shawl",
    description:
      "Ultra-soft, premium inner-chyangra cashmere pashmina shawl. Hand-woven with classic elegance for absolute warmth and comfort.",
    price: 12500,
    oldPrice: 15000,
    currency: "NPR",
    rating: 4.9,
    reviewsCount: 89,
    badge: "PREMIUM",
    weight: "180g",
    images: [
      "/FashionImages/pashmina-1.webp",
      "/FashionImages/pashmina-2.webp",
      "/FashionImages/pashmina-3.webp",
    ],
    category: "fashion",
    subCategory: "Shawls",
    originRegion: "Solukhumbu",
    inStock: true,
    stockCount: 8,
  },
  {
    name: "GoldStar Sports Shoes",
    slug: "goldstar-sports-shoes",
    description:
      "Durable, high-grip athletic sneakers manufactured locally by Goldstar. Built for reliable everyday training, outdoor trails, and active lifestyles.",
    price: 2800,
    oldPrice: 3500,
    currency: "NPR",
    rating: 4.5,
    reviewsCount: 532,
    badge: "BEST VALUE",
    weight: "700g / Pair",
    images: [
      "/FashionImages/shoes.jpg",
      "/FashionImages/shoes-1.webp",
      "/FashionImages/shoes-2.webp",
      "/FashionImages/shoes-3.webp",
    ],
    subCategory: "Footwear",
    category: "fashion", // Updated to keep global categorization uniform
    originRegion: "Kathmandu Valley",
    inStock: true,
    stockCount: 140,
  },
  {
    name: "Modern Kurta Set",
    slug: "modern-kurta-set",
    description:
      "Elegant modern kurta set tailoring premium fabrics with breathable design profiles. Clean traditional cuts optimized for modern daytime apparel.",
    price: 4900,
    oldPrice: 5900,
    currency: "NPR",
    rating: 4.7,
    reviewsCount: 45,
    badge: "SALE",
    weight: "350g Set",
    images: [
      "/FashionImages/kurta-1.webp",
      "/FashionImages/kurta-2.webp",
      "/FashionImages/kurta-3.webp",
    ],
    category: "fashion",
    subCategory: "Clothing",
    originRegion: "Kathmandu Valley",
    inStock: true,
    stockCount: 22,
  },
  {
    name: "Orthodox Ilam Tea",
    slug: "orthodox-ilam-tea",
    description:
      "First flush, hand-picked from the rolling hills of Ilam. Rich aroma and smooth flavor profiles profile unique to high-altitude Himalayan tea estates.",
    price: 1250,
    currency: "NPR",
    rating: 4.9,
    reviewsCount: 124,
    badge: "PREMIUM",
    weight: "250g Pack",
    // we don't have to provide the full path if the image is in public folder
    images: [
      "/GroceriesImages/orthodox-ilam-tea-1.webp",
      "/GroceriesImages/orthodox-ilam-tea-2.webp",
      "/GroceriesImages/orthodox-ilam-tea-3.webp",
    ],
    category: "groceries",
    subCategory: "Spices & Tea",
    originRegion: "Ilam",
    inStock: true,
    stockCount: 45,
  },
  {
    name: "Crisp Mustang Apples",
    slug: "crisp-mustang-apples",
    description:
      "Sweet and crunchy apples grown naturally in the high altitudes of Mustang. Nourished by clean Himalayan glacial waters.",
    price: 350,
    currency: "NPR",
    rating: 4.7,
    reviewsCount: 89,

    weight: "1kg Bag",
    images: [
      "/GroceriesImages/crisp-mustang-apples-1.jpg",
      "/GroceriesImages/crisp-mustang-apples-2.jpg",
      "/GroceriesImages/crisp-mustang-apples-3.jpg",
    ],
    category: "groceries",
    subCategory: "Fruits",
    originRegion: "Mustang",
    inStock: true,
    stockCount: 120,
  },
  {
    name: "Wild Cliff Honey",
    slug: "wild-cliff-honey",
    description:
      "Raw, unfiltered wild honey collected from high-altitude cliffs. Known for its medicinal properties and completely deep, robust natural sweetness.",
    price: 1800,
    currency: "NPR",
    rating: 5.0,
    reviewsCount: 56,
    badge: "BEST SELLER",
    weight: "500g Glass Jar",
    images: [
      "/GroceriesImages/wild-cliff-honey-1.webp",
      "/GroceriesImages/wild-cliff-honey-2.webp",
      "/GroceriesImages/wild-cliff-honey-3.webp",
    ],
    category: "groceries",
    subCategory: "Honey",
    originRegion: "Solukhumbu",
    inStock: true,
    stockCount: 18,
  },
  {
    name: "Jumli Red Rice",
    slug: "jumli-red-rice",
    description:
      "Nutrient-dense indigenous red rice variety originating from the remote Jumla valley. Rich in fiber, antioxidants, and traditional texture.",
    price: 850,
    currency: "NPR",
    rating: 4.8,
    reviewsCount: 73,

    weight: "2kg Bag",
    images: [
      "/GroceriesImages/jumli-red-rice-1.webp",
      "/GroceriesImages/jumli-red-rice-2.webp",
      "/GroceriesImages/jumli-red-rice-3.webp",
      "/GroceriesImages/jumli-red-rice-4.webp",
    ],
    category: "groceries",
    subCategory: "Grains",
    originRegion: "Other",
    inStock: true,
    stockCount: 60,
  },
  {
    name: "Timur Pepper",
    slug: "timur-pepper",
    description:
      "Fragrant and numbing wild berries hand-collected from the mid-hills of Nepal. Delivers a distinct citrusy aroma alongside a classic Sichuan pepper tingle.",
    price: 220,
    currency: "NPR",
    rating: 4.6,
    reviewsCount: 42,

    weight: "100g Pouch",
    images: [
      "/GroceriesImages/timur-pepper-1.webp",
      "/GroceriesImages/timur-pepper-2.webp",
      "/GroceriesImages/timur-pepper-3.webp",
    ],
    category: "groceries",
    subCategory: "Spices",
    originRegion: "Other",
    inStock: true,
    stockCount: 150,
  },
  {
    name: "Pure A2 Cow Ghee",
    slug: "pure-a2-cow-ghee",
    description:
      "Traditional bilona method ghee rendered slowly from grass-fed cows. High smoke point with a rich granular texture and distinct home-cooked aroma.",
    price: 950,
    currency: "NPR",
    rating: 4.9,
    reviewsCount: 91,

    weight: "450ml Container",
    images: [
      "/GroceriesImages/pure-cow-ghee-1.webp",
      "/GroceriesImages/pure-cow-ghee-2.webp",
      "/GroceriesImages/pure-cow-ghee-3.webp",
    ],
    category: "groceries",
    subCategory: "Dairy",
    originRegion: "Kathmandu Valley",
    inStock: true,
    stockCount: 35,
  },
];

module.exports = products;

//  The error is because you're mixing CommonJS and ES Modules.
// Your seed.js is using:

// const products = require("./data/products");
// which is CommonJS.

// But your products.js file uses:
// export const products = [
// ...
// ];

// which is ES Module syntax.
