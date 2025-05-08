const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Completed", "Cancelled"],
      default: "Pending",
    },
    shippingAddress: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    notes: { type: String },
  },
  { timestamps: true },
)

module.exports = mongoose.model("Order", orderSchema)
