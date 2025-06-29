const News = require("../models/news.model")

// GET all news
const getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ publishedAt: -1 })
    res.json(news)
  } catch (err) {
    res.status(500).json({ message: "Error al obtener noticias", error: err.message })
  }
}

// GET single news by ID
const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id)
    if (!news) return res.status(404).json({ message: "Noticia no encontrada" })
    res.json(news)
  } catch (err) {
    res.status(500).json({ message: "Error al obtener noticia", error: err.message })
  }
}

// POST create new news
const createNews = async (req, res) => {
  try {
    const noticia = new News(req.body)
    const savedNews = await noticia.save()
    res.status(201).json(savedNews)
  } catch (err) {
    res.status(400).json({ message: "Error al crear noticia", error: err.message })
  }
}

// PUT update news
const updateNews = async (req, res) => {
  try {
    const updated = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!updated) return res.status(404).json({ message: "Noticia no encontrada" })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ message: "Error al actualizar noticia", error: err.message })
  }
}

// DELETE news
const deleteNews = async (req, res) => {
  try {
    const deleted = await News.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: "Noticia no encontrada" })
    res.json({ message: "Noticia eliminada correctamente" })
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar noticia", error: err.message })
  }
}

module.exports = {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
}
