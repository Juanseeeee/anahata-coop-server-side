const express = require("express")
const {
  getResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
} = require("../controllers/resource.controller")
const { protect, admin } = require("../middleware/auth.middleware")

const router = express.Router()

router.route("/").get(getResources).post(protect, admin, createResource)

router.route("/:id").get(getResourceById).put(protect, admin, updateResource).delete(protect, admin, deleteResource)

module.exports = router
