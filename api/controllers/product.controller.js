const Product = require("../models/product.model")

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const category = req.query.category
    const searchQuery = req.query.search

    let query = { isAvailable: true }

    // Filter by category if provided
    if (category && category !== "all") {
      query.category = category
    }

    // Search functionality
    if (searchQuery) {
      query = {
        ...query,
        $or: [
          { name: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
          { tags: { $in: [new RegExp(searchQuery, "i")] } },
        ],
      }
    }

    const products = await Product.find(query)
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const { name, category, thcContent, cbdContent, price, description, image, tags, stock } = req.body

    const product = await Product.create({
      name,
      category,
      thcContent,
      cbdContent,
      price,
      description,
      image,
      tags,
      stock,
      isAvailable: stock > 0,
    })

    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const { name, category, thcContent, cbdContent, price, description, image, tags, stock, isAvailable } = req.body

    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    product.name = name || product.name
    product.category = category || product.category
    product.thcContent = thcContent || product.thcContent
    product.cbdContent = cbdContent || product.cbdContent
    product.price = price || product.price
    product.description = description || product.description
    product.image = image || product.image
    product.tags = tags || product.tags
    product.stock = stock !== undefined ? stock : product.stock
    product.isAvailable = isAvailable !== undefined ? isAvailable : product.isAvailable

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    await product.deleteOne()
    res.json({ message: "Product removed" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct }
