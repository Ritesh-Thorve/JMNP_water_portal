"use client"

import { useState } from "react"
import { Eye, Search, Calendar, MapPin, Mail, User, ImageIcon, X } from "lucide-react"

export default function QueriesTab() {
  const [selectedWard, setSelectedWard] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedQuery, setSelectedQuery] = useState(null)

  // Mock data for queries
  const queriesData = [
    {
      id: 1,
      fullName: "John Smith",
      email: "john.smith@email.com",
      wardNumber: "12",
      issueType: "No Water Supply",
      message: "There has been no water supply in our area for the past 3 days. Multiple households are affected.",
      status: "pending",
      submittedAt: "2024-03-10T10:30:00Z",
      hasImage: true,
    },
    {
      id: 2,
      fullName: "Sarah Johnson",
      email: "sarah.j@email.com",
      wardNumber: "8",
      issueType: "Low Water Pressure",
      message: "Water pressure has been very low for the past week, making it difficult to fill tanks.",
      status: "in-progress",
      submittedAt: "2024-03-09T14:15:00Z",
      hasImage: false,
    },
    {
      id: 3,
      fullName: "Mike Davis",
      email: "mike.davis@email.com",
      wardNumber: "5",
      issueType: "Pipeline Leakage",
      message: "There's a major pipeline leak on Main Street causing water wastage and road damage.",
      status: "resolved",
      submittedAt: "2024-03-08T09:45:00Z",
      hasImage: true,
    },
    {
      id: 4,
      fullName: "Emily Brown",
      email: "emily.brown@email.com",
      wardNumber: "15",
      issueType: "Water Quality Issues",
      message: "The water has been discolored and has an unusual taste for the past two days.",
      status: "pending",
      submittedAt: "2024-03-07T16:20:00Z",
      hasImage: false,
    },
  ]

  const wards = [
    "all",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
  ]
  const statuses = ["all", "pending", "in-progress", "resolved"]

  const filteredQueries = queriesData.filter((query) => {
    const matchesWard = selectedWard === "all" || query.wardNumber === selectedWard
    const matchesStatus = selectedStatus === "all" || query.status === selectedStatus
    const matchesSearch =
      searchTerm === "" ||
      query.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.issueType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.message.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesWard && matchesStatus && matchesSearch
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const updateQueryStatus = (queryId, newStatus) => {
    // In a real app, this would make an API call
    console.log(`Updating query ${queryId} to status: ${newStatus}`)
    // Update local state or refetch data
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Manage Queries</h1>
        <div className="text-sm text-gray-500">Total: {filteredQueries.length} queries</div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search queries..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ward</label>
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {wards.map((ward) => (
                <option key={ward} value={ward}>
                  {ward === "all" ? "All Wards" : `Ward ${ward}`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Queries Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Query Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQueries.map((query) => (
                <tr key={query.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">{query.issueType}</span>
                          {query.hasImage && <ImageIcon className="h-4 w-4 text-gray-400" />}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          Ward {query.wardNumber}
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{query.message}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="flex items-center text-gray-900 mb-1">
                        <User className="h-4 w-4 mr-1" />
                        {query.fullName}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Mail className="h-4 w-4 mr-1" />
                        {query.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={query.status}
                      onChange={(e) => updateQueryStatus(query.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 ${getStatusColor(query.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(query.submittedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedQuery(query)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Query Details Modal */}
      {selectedQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-gray-900">Query Details</h2>
                <button onClick={() => setSelectedQuery(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <p className="text-sm text-gray-900">{selectedQuery.fullName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-sm text-gray-900">{selectedQuery.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ward Number</label>
                    <p className="text-sm text-gray-900">Ward {selectedQuery.wardNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
                    <p className="text-sm text-gray-900">{selectedQuery.issueType}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{selectedQuery.message}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-gray-500">
                    Submitted: {new Date(selectedQuery.submittedAt).toLocaleString()}
                  </div>
                  <div className="flex space-x-2">
                    <select
                      value={selectedQuery.status}
                      onChange={(e) => updateQueryStatus(selectedQuery.id, e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
