const User = require("../models/user.model.js")
const Product = require("../models/product.model.js")
const Order = require("../models/order.model.js")
const Event = require("../models/event.model.js")

const getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, newUsersThisMonth, usersByMembership] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({
        createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
      }),
      User.aggregate([
        {
          $group: {
            _id: "$membershipLevel",
            count: { $sum: 1 }
          }
        }
      ])
    ])

    const [totalProducts, outOfStockProducts, productsByCategory] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ stock: { $lte: 0 } }),
      Product.aggregate([
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 }
          }
        }
      ])
    ])

    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    const orders = await Order.find()
    const ordersThisMonth = orders.filter(o => new Date(o.createdAt) >= startOfMonth)
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0)
    const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0

    const totalOrders = orders.length

    const [upcomingEvents, totalEvents] = await Promise.all([
      Event.countDocuments({ date: { $gte: new Date() } }),
      Event.countDocuments()
    ])

    const response = {
      userStats: {
        totalUsers,
        newUsersThisMonth,
        basicMembers: usersByMembership.find(m => m._id === "basic")?.count || 0,
        premiumMembers: usersByMembership.find(m => m._id === "premium")?.count || 0,
        founderMembers: usersByMembership.find(m => m._id === "founder")?.count || 0,
      },
      productStats: {
        totalProducts,
        outOfStockProducts,
        byCategory: productsByCategory.reduce((acc, curr) => {
          acc[curr._id] = curr.count
          return acc
        }, {
          flower: 0,
          edibles: 0,
          tinctures: 0,
          concentrates: 0,
          accessories: 0
        }),
      },
      orderStats: {
        totalOrders,
        ordersThisMonth: ordersThisMonth.length,
        totalRevenue,
        averageOrderValue,
      },
      eventStats: {
        totalEvents,
        upcomingEvents,
      },
    }

    res.status(200).json(response)
  } catch (error) {
    console.error("Error in getDashboardStats:", error)
    res.status(500).json({ message: "Error fetching dashboard stats" })
  }
}

module.exports = { getDashboardStats }

