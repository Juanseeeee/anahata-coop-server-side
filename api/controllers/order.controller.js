const Order = require("../models/order.model")
const Product = require("../models/product.model")

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items" })
    }

    // Verify products and calculate total
    let total = 0
    const orderItems = []

    for (const item of items) {
      const product = await Product.findById(item.product)

      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product}` })
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` })
      }

      // Update product stock
      product.stock -= item.quantity
      if (product.stock === 0) {
        product.isAvailable = false
      }
      await product.save()

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      })

      total += product.price * item.quantity
    }

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      total,
      shippingAddress,
      paymentMethod,
      status: "Processing",
      paymentStatus: "Pending",
    })

    res.status(201).json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    // Check if the order belongs to the logged-in user
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" })
    }

    res.json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .sort({ createdAt: -1 }) // Sort by date, newest first
    .populate("items.product", "name price image")

  res.json(orders)
}

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body

    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    order.status = status

    // If order is completed, update payment status
    if (status === "Completed") {
      order.paymentStatus = "Paid"
    }

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Update payment status
// @route   PUT /api/orders/:id/payment
// @access  Private/Admin
const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body

    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    order.paymentStatus = paymentStatus

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { createOrder, getOrderById, getMyOrders, updateOrderStatus, updatePaymentStatus }
