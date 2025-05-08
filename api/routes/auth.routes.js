const express = require("express")
const { register, login, getProfile, logout } = require("../controllers/auth.controller")
const { protect } = require("../middleware/auth.middleware")

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/profile", protect, getProfile)

module.exports = router
