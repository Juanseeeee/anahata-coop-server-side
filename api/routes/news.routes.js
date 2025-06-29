const express = require("express")
const router = express.Router()

const {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} = require("../controllers/news.controller")

const { protect, admin } = require("../middleware/auth.middleware")

router.route("/").get(getNews).post(protect, admin, createNews)
router.route("/:id").get(getNewsById).put(protect, admin, updateNews).delete(protect, admin, deleteNews)

module.exports = router
