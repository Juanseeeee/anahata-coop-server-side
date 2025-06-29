const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

const protect = async (req, res, next) => {
  let token

  // 1. Buscar token en el header Authorization
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
  }

  // 2. O buscarlo en las cookies
  if (!token && req.cookies && req.cookies["auth-token"]) {
    token = req.cookies["auth-token"]
  }

  // 3. Si no hay token, denegar acceso
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret")

    req.user = await User.findById(decoded.id).select("-password")

    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({ message: "Not authorized, token failed" })
  }
}


// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401).json({ message: "Not authorized as an admin" })
  }
}

module.exports = { protect, admin }
