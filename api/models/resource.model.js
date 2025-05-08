const mongoose = require("mongoose")

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["article", "guide", "video", "research"],
    },
    description: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    videoUrl: { type: String },
    fileUrl: { type: String },
    readTime: { type: String },
    duration: { type: String },
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
)

module.exports = mongoose.model("Resource", resourceSchema)
