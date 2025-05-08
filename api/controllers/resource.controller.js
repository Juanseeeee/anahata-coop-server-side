const Resource = require("../models/resource.model")

// @desc    Fetch all resources
// @route   GET /api/resources
// @access  Public
const getResources = async (req, res) => {
  try {
    const type = req.query.type
    const searchQuery = req.query.search

    let query = { isPublished: true }

    // Filter by type if provided
    if (type && type !== "all") {
      query.type = type
    }

    // Search functionality
    if (searchQuery) {
      query = {
        ...query,
        $or: [
          { title: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
          { content: { $regex: searchQuery, $options: "i" } },
          { tags: { $in: [new RegExp(searchQuery, "i")] } },
        ],
      }
    }

    const resources = await Resource.find(query)
    res.json(resources)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Fetch single resource
// @route   GET /api/resources/:id
// @access  Public
const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id)

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" })
    }

    res.json(resource)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Create a resource
// @route   POST /api/resources
// @access  Private/Admin
const createResource = async (req, res) => {
  try {
    const { title, type, description, content, image, videoUrl, fileUrl, readTime, duration, tags } = req.body

    const resource = await Resource.create({
      title,
      type,
      description,
      content,
      image,
      videoUrl,
      fileUrl,
      readTime,
      duration,
      tags,
      isPublished: true,
    })

    res.status(201).json(resource)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Update a resource
// @route   PUT /api/resources/:id
// @access  Private/Admin
const updateResource = async (req, res) => {
  try {
    const { title, type, description, content, image, videoUrl, fileUrl, readTime, duration, tags, isPublished } =
      req.body

    const resource = await Resource.findById(req.params.id)

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" })
    }

    resource.title = title || resource.title
    resource.type = type || resource.type
    resource.description = description || resource.description
    resource.content = content || resource.content
    resource.image = image || resource.image
    resource.videoUrl = videoUrl || resource.videoUrl
    resource.fileUrl = fileUrl || resource.fileUrl
    resource.readTime = readTime || resource.readTime
    resource.duration = duration || resource.duration
    resource.tags = tags || resource.tags
    resource.isPublished = isPublished !== undefined ? isPublished : resource.isPublished

    const updatedResource = await resource.save()
    res.json(updatedResource)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Delete a resource
// @route   DELETE /api/resources/:id
// @access  Private/Admin
const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id)

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" })
    }

    await resource.deleteOne()
    res.json({ message: "Resource removed" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getResources, getResourceById, createResource, updateResource, deleteResource }
