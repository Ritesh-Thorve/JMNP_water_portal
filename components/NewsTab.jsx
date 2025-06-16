"use client"

import { useState } from "react"
import { Send, CheckCircle } from "lucide-react"

export default function NewsTab() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    wardNumber: "all",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const wards = ["all", ...Array.from({ length: 20 }, (_, i) => (i + 1).toString())]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        title: "",
        description: "",
        wardNumber: "all",
      })
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">News Published Successfully!</h2>
          <p className="text-gray-600">The news update has been published and is now visible to users.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload News & Updates</h1>
        <p className="text-gray-600">
          Create and publish news updates for residents about water supply, maintenance, and other important
          information.
        </p>
      </div>

      <div className="max-w-2xl bg-white rounded-xl shadow-lg p-8">
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

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Publish News</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Recent News Preview */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent News Updates</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="font-medium text-gray-900">Scheduled Maintenance - Ward 12</h3>
            <p className="text-sm text-gray-600 mt-1">Water supply will be temporarily interrupted on March 15th...</p>
            <p className="text-xs text-gray-500 mt-2">Published 2 days ago</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4 py-2">
            <h3 className="font-medium text-gray-900">New Water Treatment Plant Operational</h3>
            <p className="text-sm text-gray-600 mt-1">
              The new water treatment facility in Ward 8 is now fully operational...
            </p>
            <p className="text-xs text-gray-500 mt-2">Published 4 days ago</p>
          </div>
          <div className="border-l-4 border-yellow-500 pl-4 py-2">
            <h3 className="font-medium text-gray-900">Water Quality Testing Results</h3>
            <p className="text-sm text-gray-600 mt-1">Monthly water quality testing results are now available...</p>
            <p className="text-xs text-gray-500 mt-2">Published 1 week ago</p>
          </div>
        </div>
      </div>
    </div>
  )
}
