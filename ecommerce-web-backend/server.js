require("dotenv").config();
const connectdb = require("./config/db.js");
const app = require("./app");

connectdb();

// Fallback to 5000 if process.env.PORT is not set
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server Running in port:", port);
});
