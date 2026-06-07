const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductBySlug,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.get("/:category/:slug", getProductBySlug);
// router.post("/");
// When you send a PUT request to router.put("/:id"), you must send the entire updated object in the request body.
// Because replacing the whole object can be risky or inefficient, web developers often use PATCH instead. PATCH allows you to modify just a single field (like updating only the price) without touching anything else.
// router.put("/:id");
// router.delete("/:id");

module.exports = router;
