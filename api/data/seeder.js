const mongoose = require("mongoose")
const dotenv = require("dotenv")
const bcrypt = require("bcryptjs")
const User = require("../models/user.model")
const Product = require("../models/product.model")
const Resource = require("../models/resource.model")

// Load environment variables
dotenv.config()

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/cannabis-cooperative")
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => {
    console.error(`MongoDB connection error: ${err}`)
    process.exit(1)
  })

// Sample data
const users = [
  {
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
    membershipLevel: "Founder",
    memberSince: new Date("2022-01-01"),
    membershipId: "GC-00001",
    nextRenewal: new Date("2026-01-01"),
  },
  {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
    membershipLevel: "Premium",
    memberSince: new Date("2023-01-15"),
    membershipId: "GC-12345",
    nextRenewal: new Date("2026-01-15"),
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
    membershipLevel: "Basic",
    memberSince: new Date("2023-03-10"),
    membershipId: "GC-23456",
    nextRenewal: new Date("2024-03-10"),
  },
]

const products = [
  {
    name: "Premium Blend",
    category: "flower",
    thcContent: "18%",
    cbdContent: "0.5%",
    price: 45,
    description: "A balanced hybrid strain with earthy tones and relaxing effects.",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["hybrid", "relaxing", "earthy"],
    stock: 50,
    isAvailable: true,
  },
  {
    name: "Relief Tincture",
    category: "tinctures",
    thcContent: "5%",
    cbdContent: "15%",
    price: 65,
    description: "CBD-dominant tincture designed for pain relief without strong psychoactive effects.",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["cbd", "pain-relief", "therapeutic"],
    stock: 30,
    isAvailable: true,
  },
  {
    name: "Energy Gummies",
    category: "edibles",
    thcContent: "10mg/piece",
    cbdContent: "2mg/piece",
    price: 30,
    description: "Sativa-infused gummies for a boost of creativity and energy.",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["sativa", "energizing", "edible"],
    stock: 40,
    isAvailable: true,
  },
  {
    name: "Sleep Formula",
    category: "tinctures",
    thcContent: "10%",
    cbdContent: "5%",
    price: 55,
    description: "Indica-dominant tincture with added melatonin for improved sleep.",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["indica", "sleep", "nighttime"],
    stock: 25,
    isAvailable: true,
  },
  {
    name: "Calm Cookies",
    category: "edibles",
    thcContent: "5mg/cookie",
    cbdContent: "5mg/cookie",
    price: 25,
    description: "Balanced 1:1 THC:CBD cookies for a mild, relaxing experience.",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["balanced", "mild", "edible"],
    stock: 35,
    isAvailable: true,
  },
  {
    name: "Mountain Haze",
    category: "flower",
    thcContent: "22%",
    cbdContent: "0.3%",
    price: 50,
    description: "High-THC sativa strain with citrus notes and uplifting effects.",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["sativa", "uplifting", "citrus"],
    stock: 20,
    isAvailable: true,
  },
]

const resources = [
  {
    title: "Understanding Cannabis Strains",
    type: "article",
    description: "Learn about the differences between indica, sativa, and hybrid strains and their effects.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/placeholder.svg?height=200&width=350",
    readTime: "8 min read",
    tags: ["education", "strains", "effects"],
    isPublished: true,
  },
  {
    title: "Beginner's Guide to Tinctures",
    type: "guide",
    description: "Everything you need to know about cannabis tinctures, including dosage and administration.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/placeholder.svg?height=200&width=350",
    readTime: "12 min read",
    tags: ["tinctures", "beginners", "dosage"],
    isPublished: true,
  },
  {
    title: "The Endocannabinoid System Explained",
    type: "video",
    description: "A comprehensive explanation of how cannabis interacts with your body's endocannabinoid system.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/placeholder.svg?height=200&width=350",
    videoUrl: "https://example.com/videos/endocannabinoid-system",
    duration: "15:24",
    tags: ["science", "body", "medical"],
    isPublished: true,
  },
  {
    title: "Cannabis and Sleep: Research Findings",
    type: "research",
    description: "Recent research on how different cannabinoids affect sleep patterns and quality.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/placeholder.svg?height=200&width=350",
    fileUrl: "https://example.com/files/cannabis-sleep-research.pdf",
    readTime: "20 min read",
    tags: ["research", "sleep", "medical"],
    isPublished: true,
  },
  {
    title: "Cooking with Cannabis",
    type: "guide",
    description: "Learn how to properly infuse oils and create delicious edibles at home.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/placeholder.svg?height=200&width=350",
    readTime: "15 min read",
    tags: ["cooking", "edibles", "recipes"],
    isPublished: true,
  },
  {
    title: "Sustainable Growing Practices",
    type: "video",
    description: "Our master growers share environmentally friendly cultivation techniques.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/placeholder.svg?height=200&width=350",
    videoUrl: "https://example.com/videos/sustainable-growing",
    duration: "22:15",
    tags: ["growing", "sustainability", "environment"],
    isPublished: true,
  },
]

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany()
    await Product.deleteMany()
    await Resource.deleteMany()

    // Insert new data
    await User.insertMany(users)
    await Product.insertMany(products)
    await Resource.insertMany(resources)

    console.log("Data imported successfully!")
    process.exit()
  } catch (error) {
    console.error(`Error importing data: ${error}`)
    process.exit(1)
  }
}

// Delete all data
const destroyData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    await Resource.deleteMany()

    console.log("Data destroyed successfully!")
    process.exit()
  } catch (error) {
    console.error(`Error destroying data: ${error}`)
    process.exit(1)
  }
}

// Run script based on command line argument
if (process.argv[2] === "-d") {
  destroyData()
} else {
  importData()
}
