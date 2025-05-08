const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["flower", "edibles", "tinctures", "concentrates", "accessories"],
    },
    thcContent: { type: String, required: true },
    cbdContent: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String },
    tags: [{ type: String }],
    stock: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true },
)

module.exports = mongoose.model("Product", productSchema)
