// Creating Database Connection
const mongoose = require("mongoose");

const mongo_uri = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongo_uri);
    console.log("MONGODB connected successfully");
  } catch (error) {
    console.log("MONGODB connection Failed", error);
    process.exit(1);
  }
};

// When you use module.exports = connectDB;, you are exporting the entire function itself, not the result of running it.
module.exports = connectDB;
