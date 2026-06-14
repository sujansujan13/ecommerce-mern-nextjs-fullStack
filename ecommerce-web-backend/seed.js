require("dotenv").config();
const mongoose = require("mongoose");
const products = require("./data/products");
const connectDB = require("./config/db");
const product = require("./models/product");
const Cart = require("./models/Cart");

const seedProducts = async () => {
  try {
    // connecting db
    await connectDB();

    // clearing old data
    await product.deleteMany();
    console.log("Old Data Cleared");

    // ✅ Clear out stale carts so dead product IDs don't break your frontend populate!
    await Cart.deleteMany({});
    console.log("Old Data & Carts Cleared");

    // inserting products first
    await product.insertMany(products);
    console.log("Products Seeded");

    console.log("Seeding Completed");

    // Clean exit: Disconnect first, then close the process
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.log("Seeding data to databse error", error);
    process.exit(1);
  }
};

seedProducts();
