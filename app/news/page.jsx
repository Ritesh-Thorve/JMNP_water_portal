"use client"

import { useState } from "react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { Calendar, MapPin, Filter } from "lucide-react"

export default function News() {
  const [selectedWard, setSelectedWard] = useState("all")

  // Mock data for news/updates
  const newsData = [
    {
      id: 1,
      title: "Scheduled Maintenance - Ward 12",
      description:
        "Water supply will be temporarily interrupted on March 15th from 10 AM to 2 PM for routine maintenance of the main pipeline.",
      ward: "12",
      date: "2024-03-10",
      type: "maintenance",
    },
    {
      id: 2,
      title: "New Water Treatment Plant Operational",
      description:
        "The new water treatment facility in Ward 8 is now fully operational, improving water quality and supply reliability for residents.",
      ward: "8",
      date: "2024-03-08",
      type: "update",
    },
    {
      id: 3,
      title: "Emergency Repair Completed - Ward 5",
      description:
        "Emergency pipeline repair in Ward 5 has been completed. Normal water supply has been restored to all affected areas.",
      ward: "5",
      date: "2024-03-07",
      type: "emergency",
    },
    {
      id: 4,
      title: "Water Quality Testing Results",
      description:
        "Monthly water quality testing results are now available. All parameters meet safety standards across all wards.",
      ward: "all",
      date: "2024-03-05",
      type: "update",
    },
    {
      id: 5,
      title: "Planned Upgrade - Ward 15",
      description:
        "Infrastructure upgrade project will begin in Ward 15 next week. Temporary supply arrangements have been made.",
      ward: "15",
      date: "2024-03-03",
      type: "maintenance",
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

  // Filter news based on selected ward
  const filteredNews =
    selectedWard === "all" ? newsData : newsData.filter((item) => item.ward === selectedWard || item.ward === "all")

  // Function to get color class based on news type
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">News & Updates</h1>
          <p className="text-lg text-gray-600">
            Stay informed about water supply updates, maintenance schedules, and important announcements.
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <label htmlFor="ward-filter" className="text-sm font-medium text-gray-700">
              Filter by Ward:
            </label>
            <select
              id="ward-filter"
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {wards.map((ward) => (
                <option key={ward} value={ward}>
                  {ward === "all" ? "All Wards" : `Ward ${ward}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* News Cards */}
        <div className="space-y-6">
          {filteredNews.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                    {item.ward !== "all" && (
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        Ward {item.ward}
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h2>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-4 md:mt-0">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(item.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No updates found for the selected ward.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
