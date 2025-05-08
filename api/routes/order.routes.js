const express = require("express")
const {
  createOrder,
  getOrderById,
  getMyOrders,
  updateOrderStatus,
  updatePaymentStatus,
} = require("../controllers/order.controller")
const { protect, admin } = require("../middleware/auth.middleware")

const router = express.Router()

router.route("/").post(protect, createOrder)

router.route("/myorders").get(protect, getMyOrders)

router.route("/:id").get(protect, getOrderById)

router.route("/:id/status").put(protect, admin, updateOrderStatus)

router.route("/:id/payment").put(protect, admin, updatePaymentStatus)

module.exports = router
