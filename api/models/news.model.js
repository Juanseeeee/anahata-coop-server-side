const mongoose = require("mongoose")

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    publishedAt: { type: Date, default: () => new Date().toISOString().split("T")[0] },
    category: { type: String, default: "general" },
    featured: { type: Boolean, default: false },
    imageUrl: { type: String, default: null },
    tags: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
)

const News = mongoose.model("News", newsSchema)
module.exports = News
