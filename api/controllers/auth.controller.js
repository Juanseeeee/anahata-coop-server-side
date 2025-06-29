const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "your_jwt_secret", {
    expiresIn: "1h",
  })
}

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body

    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        membershipLevel: user.membershipLevel,
        memberSince: user.memberSince,
        membershipId: user.membershipId,
        nextRenewal: user.nextRenewal,
        token: generateToken(user._id),
      })
    } else {
      res.status(400).json({ message: "Invalid user data" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body
    console.log(email,password)
    // Check for user email
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    // Generate token
    const token = generateToken(user._id)

    // Set token in HTTP-only cookie
    res.cookie("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    // Set admin status in a separate cookie
    if (user.isAdmin) {
      res.cookie("is-admin", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
    }

    // Send response
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      membershipLevel: user.membershipLevel,
      memberSince: user.memberSince,
      membershipId: user.membershipId,
      nextRenewal: user.nextRenewal,
      isAdmin: user.isAdmin,
      token, // Still include the token in the response for client-side state
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//@desc Logout sesion and empty cookies
//@route POST /api/auth/logout
//@access Private?
const logout = (req, res) => {
  res.clearCookie("auth-token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.clearCookie("is-admin", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Sesión cerrada correctamente" });
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      bio: user.bio,
      membershipLevel: user.membershipLevel,
      memberSince: user.memberSince,
      membershipId: user.membershipId,
      nextRenewal: user.nextRenewal,
      notifications: user.notifications,
      isAdmin: user.isAdmin
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { register, login, getProfile, logout }
