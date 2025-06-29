const express = require("express")
const router = express.Router()
const upload = require("../middleware/upload.middleware")
const { protect, admin } = require("../middleware/auth.middleware")

// Ruta para subir imágenes de eventos
router.post("/", protect, admin, upload.single("image"), (req, res) => {
  res.status(200).json({ imageUrl: `/api/uploads/events/${req.file.filename}` })
})

module.exports = router
