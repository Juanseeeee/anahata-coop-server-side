const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true }, // por ejemplo: "Capacitación", "Encuentro"
    capacity: { type: Number, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["proximo","activo", "finalizado", "cancelado"],
      default: "activo",
    },
    image: { type: String }, // URL o path local
    inscriptos: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
)

const Event = mongoose.model("Event", eventSchema)
module.exports = Event
