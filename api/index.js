const express = require("express")
const cors = require("cors")
const path = require("path")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const authRoutes = require("./routes/auth.routes")
const productRoutes = require("./routes/product.routes")
const orderRoutes = require("./routes/order.routes")
const resourceRoutes = require("./routes/resource.routes")
const userRoutes = require("./routes/user.routes")
const eventRoutes = require("./routes/event.routes")
const uploadRoutes = require("./routes/upload.routes")
const newsRoutes = require("./routes/news.routes") // ajustá el path si estás en otra carpeta
const adminRoutes = require("./routes/admin.routes")
const { errorHandler } = require("./middleware/error.middleware")
const cookieParser = require("cookie-parser")
// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/cannabis-cooperative"

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")))



// Routes
app.use("/api/upload", uploadRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/resources", resourceRoutes)
app.use("/api/users", userRoutes)
app.use("/api/events", eventRoutes)
app.use("/api/news", newsRoutes)
app.use("/api/admin", adminRoutes)




// Error handling middleware
app.use(errorHandler)

// Connect to MongoDB and start server
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB")
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error)
    process.exit(1)
  })

module.exports = app
