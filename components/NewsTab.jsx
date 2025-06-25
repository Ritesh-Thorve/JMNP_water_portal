"use client"

import { useState } from "react"
import { Send, CheckCircle, Edit, Trash2, Upload, X, Eye, Plus } from "lucide-react"

export default function NewsTab() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    wardNumber: "all",
    image: null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [viewingPost, setViewingPost] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)

  // Mock data for existing news posts
  const [newsPosts, setNewsPosts] = useState([
    {
      id: 1,
      title: "Scheduled Maintenance - Ward 12",
      description:
        "Water supply will be temporarily interrupted on March 15th from 10 AM to 2 PM for routine maintenance of the main pipeline. Residents are advised to store water in advance.",
      ward: "12",
      date: "2024-03-10T10:30:00Z",
      type: "maintenance",
      image: "/placeholder.svg?height=200&width=300",
      status: "published",
    },
    {
      id: 2,
      title: "New Water Treatment Plant Operational",
      description:
        "The new water treatment facility in Ward 8 is now fully operational, improving water quality and supply reliability for residents. This state-of-the-art facility can process 50,000 liters per hour.",
      ward: "8",
      date: "2024-03-08T14:15:00Z",
      type: "update",
      image: null,
      status: "published",
    },
    {
      id: 3,
      title: "Emergency Repair Completed - Ward 5",
      description:
        "Emergency pipeline repair in Ward 5 has been completed. Normal water supply has been restored to all affected areas. We apologize for any inconvenience caused.",
      ward: "5",
      date: "2024-03-07T09:45:00Z",
      type: "emergency",
      image: "/placeholder.svg?height=200&width=300",
      status: "published",
    },
  ])

  const wards = ["all", ...Array.from({ length: 20 }, (_, i) => (i + 1).toString())]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData((prev) => ({
      ...prev,
      image: file,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (editingPost) {
      // Update existing post
      setNewsPosts((prev) =>
        prev.map((post) =>
          post.id === editingPost.id
            ? {
                ...post,
                title: formData.title,
                description: formData.description,
                ward: formData.wardNumber,
                image: formData.image ? URL.createObjectURL(formData.image) : post.image,
                date: new Date().toISOString(),
              }
            : post,
        ),
      )
      setEditingPost(null)
    } else {
      // Create new post
      const newPost = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        ward: formData.wardNumber,
        date: new Date().toISOString(),
        type: "update",
        image: formData.image ? URL.createObjectURL(formData.image) : null,
        status: "published",
      }
      setNewsPosts((prev) => [newPost, ...prev])
    }

    setIsSubmitting(false)
    setIsSubmitted(true)
    setShowCreateForm(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        title: "",
        description: "",
        wardNumber: "all",
        image: null,
      })
    }, 3000)
  }

  const handleEdit = (post) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      description: post.description,
      wardNumber: post.ward,
      image: null,
    })
    setShowCreateForm(true)
  }

  const handleDelete = (postId) => {
    if (window.confirm("Are you sure you want to delete this news post?")) {
      setNewsPosts((prev) => prev.filter((post) => post.id !== postId))
    }
  }

  const handleCancelEdit = () => {
    setEditingPost(null)
    setShowCreateForm(false)
    setFormData({
      title: "",
      description: "",
      wardNumber: "all",
      image: null,
    })
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "emergency":
        return "bg-red-100 text-red-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "update":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {editingPost ? "News Updated Successfully!" : "News Published Successfully!"}
          </h2>
          <p className="text-gray-600">
            The news update has been {editingPost ? "updated" : "published"} and is now visible to users.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Manage News & Updates</h1>
          <p className="text-gray-600">Create, edit, and manage news updates for residents.</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create News</span>
        </button>
      </div>

      {/* Create/Edit Form */}
      {showCreateForm && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {editingPost ? "Edit News Post" : "Create New News Post"}
            </h2>
            <button onClick={handleCancelEdit} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                News Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter news title..."
              />
            </div>

            <div>
              <label htmlFor="wardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Target Ward *
              </label>
              <select
                id="wardNumber"
                name="wardNumber"
                required
                value={formData.wardNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {wards.map((ward) => (
                  <option key={ward} value={ward}>
                    {ward === "all" ? "All Wards" : `Ward ${ward}`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={6}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter detailed description of the news/update..."
              />
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop an image</p>
                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="image"
                  className="mt-2 inline-block bg-blue-50 text-blue-600 px-4 py-2 rounded-md cursor-pointer hover:bg-blue-100 transition-colors"
                >
                  Choose File
                </label>
                {formData.image && <p className="mt-2 text-sm text-green-600">Selected: {formData.image.name}</p>}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>{editingPost ? "Updating..." : "Publishing..."}</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>{editingPost ? "Update News" : "Publish News"}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* News Posts List */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Published News ({newsPosts.length})</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {newsPosts.map((post) => (
            <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(post.type)}`}>
                      {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {post.ward === "all" ? "All Wards" : `Ward ${post.ward}`}
                    </span>
                    <span className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">{post.description}</p>
                  {post.image && (
                    <div className="mb-3">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-32 h-20 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => setViewingPost(post)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                    title="Edit Post"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete Post"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View Post Modal */}
      {viewingPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-gray-900">News Details</h2>
                <button onClick={() => setViewingPost(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(viewingPost.type)}`}>
                    {viewingPost.type.charAt(0).toUpperCase() + viewingPost.type.slice(1)}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900">{viewingPost.title}</h3>

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Ward: {viewingPost.ward === "all" ? "All Wards" : `Ward ${viewingPost.ward}`}</span>
                  <span>Published: {new Date(viewingPost.date).toLocaleString()}</span>
                </div>

                {viewingPost.image && (
                  <div>
                    <img
                      src={viewingPost.image || "/placeholder.svg"}
                      alt={viewingPost.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}

                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">{viewingPost.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
