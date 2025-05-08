const User = require("../models/user.model")

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.email = req.body.email || user.email
    user.phone = req.body.phone || user.phone
    user.address = req.body.address || user.address
    user.bio = req.body.bio || user.bio

    // Update password if provided
    if (req.body.password) {
      user.password = req.body.password
    }

    // Update notification preferences if provided
    if (req.body.notifications) {
      user.notifications = {
        ...user.notifications,
        ...req.body.notifications,
      }
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      bio: updatedUser.bio,
      membershipLevel: updatedUser.membershipLevel,
      memberSince: updatedUser.memberSince,
      membershipId: updatedUser.membershipId,
      nextRenewal: updatedUser.nextRenewal,
      notifications: updatedUser.notifications,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Update membership level
// @route   PUT /api/users/membership
// @access  Private
const updateMembershipLevel = async (req, res) => {
  try {
    const { membershipLevel } = req.body

    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Validate membership level
    if (!["Basic", "Premium", "Founder"].includes(membershipLevel)) {
      return res.status(400).json({ message: "Invalid membership level" })
    }

    user.membershipLevel = membershipLevel

    // Update next renewal date to one year from now
    user.nextRenewal = new Date(new Date().setFullYear(new Date().getFullYear() + 1))

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      membershipLevel: updatedUser.membershipLevel,
      nextRenewal: updatedUser.nextRenewal,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password")
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    await user.deleteOne()
    res.json({ message: "User removed" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { updateUserProfile, updateMembershipLevel, getUsers, deleteUser }
