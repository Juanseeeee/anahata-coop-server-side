const multer = require("multer")
const path = require("path")

// Configuración del storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads", "events"))
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

// Filtro de tipos permitidos
const fileFilter = (req, file, cb) => {
  const filetypes = /jpg|jpeg|png|webp/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    cb(null, true)
  } else {
    cb(new Error("Solo se permiten imágenes (jpg, jpeg, png, webp)"))
  }
}

const upload = multer({ storage, fileFilter })

module.exports = upload
