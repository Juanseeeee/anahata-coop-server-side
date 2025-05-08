const express = require("express")
const { updateUserProfile, updateMembershipLevel, getUsers, deleteUser } = require("../controllers/user.controller")
const { protect, admin } = require("../middleware/auth.middleware")

const router = express.Router()

router.route("/profile").put(protect, updateUserProfile)

router.route("/membership").put(protect, updateMembershipLevel)

router.route("/").get(protect, admin, getUsers)

router.route("/:id").delete(protect, admin, deleteUser)

module.exports = router
