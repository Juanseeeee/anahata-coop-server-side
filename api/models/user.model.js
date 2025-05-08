const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    bio: { type: String },
    memberSince: { type: Date, default: Date.now },
    membershipLevel: {
      type: String,
      enum: ["Basic", "Premium", "Founder"],
      default: "Basic",
    },
    membershipId: {
      type: String,
      default: () => `GC-${Math.floor(10000 + Math.random() * 90000)}`,
    },
    nextRenewal: {
      type: Date,
      default: () => new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    },
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      promotions: { type: Boolean, default: true },
      newsletter: { type: Boolean, default: true },
    },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true },
)

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model("User", userSchema)
