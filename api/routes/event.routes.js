const express = require("express")
const router = express.Router()
const upload = require("../middleware/upload.middleware")


const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller")

const { protect, admin } = require("../middleware/auth.middleware")

router.route("/")
  .get(getEvents)
  .post(protect, admin, createEvent, upload.single("image"))

router.route("/:id")
  .get(getEventById)
  .put(protect, admin, updateEvent)
  .delete(protect, admin, deleteEvent)

module.exports = router
