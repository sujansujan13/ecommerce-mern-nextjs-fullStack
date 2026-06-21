// Frontend triggers search/sort via state changes → sends query params → backend builds MongoDB filter + sort logic → returns updated products list.
const Product = require("../models/product");
// handler function
const getAllProducts = async (req, res) => {
  try {
    // req.query batw category shodhne (e.g., /api/products?category=electronics)
    // Values come after ?
    // /api/products?category=electronics&page=2
    const { sort, search, category } = req.query;

    let filter = {};
    if (category) {
      filter.category = category; // Query filter ready paryo
    }

    if (search) {
      // ✅ Escape special regex characters before passing to MongoDB
      // Without this: search="(" crashes with "Invalid regular expression"
      // e.g. "(", "[", ".", "*", "+" are all special regex chars
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      filter.$or = [
        { name: { $regex: escapedSearch, $options: "i" } },
        { description: { $regex: escapedSearch, $options: "i" } },
        { category: { $regex: escapedSearch, $options: "i" } },
        { subCategory: { $regex: escapedSearch, $options: "i" } },
        { brand: { $regex: escapedSearch, $options: "i" } },
        { tags: { $regex: escapedSearch, $options: "i" } },
      ];
    }

    let sortOption = {};
    if (sort === "Price:Low to High") {
      sortOption.price = 1;
    }
    if (sort === "Price:High to Low") {
      sortOption.price = -1;
    }
    if (sort === "Newest Arrival") {
      sortOption.createdAt = -1;
    }
    if (sort === "Popularity") {
      sortOption.rating = -1;
    }

    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    const products = await Product.find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit)
      // Without .lean():
      // Mongoose returns heavy Mongoose documents
      // With .lean():
      // plain JavaScript objects
      // faster
      // lower memory usage
      .lean();

    // Explicitly send a 200 Success status with the data
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log("Error fetching products", error);

    // Send a 500 Internal Server Error so the frontend knows something went wrong
    return res.status(500).json({
      success: false,
      message: "Server error while fetching results",
    });
  }
};

const getProductBySlug = async (req, res) => {
  console.log("HIT PRODUCT ROUTE");
  console.log(req.params);
  try {
    // req.params is an object that contains dynamic values from the URL path.
    const { category, slug } = req.params;

    // 1. Target product khojne (lean use garda read-speed fast hunchha)
    const product = await Product.findOne({ category, slug }).lean();

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Page Not Found" });
    }

    const relatedProducts = await Product.find({
      category,
      _id: { $ne: product._id }, // Current item list ma nadekhaune
    })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    return res.status(200).json({ success: true, product, relatedProducts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllProducts, getProductBySlug };
