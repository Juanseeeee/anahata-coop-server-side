const Event = require("../models/event.model")

// GET /api/events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 })
    res.json(events)
  } catch (err) {
    res.status(500).json({ message: "Error al obtener eventos" })
  }
}

// GET /api/events/:id
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) return res.status(404).json({ message: "Evento no encontrado" })
    res.json(event)
  } catch (err) {
    res.status(500).json({ message: "Error al obtener el evento" })
  }
}

// POST /api/events
const createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body)
    const savedEvent = await newEvent.save()
    res.status(201).json(savedEvent)
  } catch (err) {
    res.status(400).json({ message: "Error al crear evento", error: err.message })
  }
}

// PUT /api/events/:id
const updateEvent = async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) return res.status(404).json({ message: "Evento no encontrado" })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ message: "Error al actualizar evento", error: err.message })
  }
}

// DELETE /api/events/:id
const deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: "Evento no encontrado" })
    res.json({ message: "Evento eliminado correctamente" })
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar evento" })
  }
}

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
}
