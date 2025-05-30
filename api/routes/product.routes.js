const express = require("express")
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller")
const { protect, admin } = require("../middleware/auth.middleware")

const router = express.Router()

router.route("/").get(getProducts).post(protect, admin, createProduct)

router.route("/:id").get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct)

module.exports = router
