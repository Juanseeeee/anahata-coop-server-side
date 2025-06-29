const express = require("express")
const { getDashboardStats } = require("../controllers/admin.controller")
const { protect, admin } = require("../middleware/auth.middleware")

const router = express.Router()

router.get("/dashboard", protect, admin, getDashboardStats)

module.exports = router
