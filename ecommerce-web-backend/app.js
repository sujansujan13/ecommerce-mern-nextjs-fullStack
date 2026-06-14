// Create Express App
const express = require("express");
const cors = require("cors");
const productRoute = require("./routes/productRoute");
const authRoute = require("./routes/authRoute");
const cartRoute = require("./routes/cartRoute");
// Imports middleware that allows Express to read cookies from incoming requests
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());
// “Automatically read cookies and put them in req.cookies”
app.use(cookieParser());

app.use("/api/products", productRoute);
app.use("/api/auth", authRoute);

app.use("/api/cart", cartRoute);

module.exports = app;
