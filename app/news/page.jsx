"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Calendar, MapPin, Filter } from "lucide-react";
import service from "../../lib/appwrite/service";  

export default function News() {
  const [selectedWard, setSelectedWard] = useState("all");
  const [newsData, setNewsData] = useState([]);

  //Fetch real news from Appwrite
  useEffect(() => {
    (async () => {
      try {
        const response = await service.getAllNews();
        setNewsData(response.documents);
      } catch (error) {
        console.error("Failed to fetch news:", error);
        setNewsData([]);
      }
    })();
  }, []);

  const wards = [
    "all",
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
  ];

  //Filter news based on selected ward
  const filteredNews =
    selectedWard === "all"
      ? newsData
      : newsData.filter(
          (item) => item.ward_no === selectedWard || item.ward_no === "all"
        );

  //Get badge style by type
  const getTypeColor = (type) => {
    switch (type) {
      case "emergency":
        return "bg-red-100 text-red-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      case "update":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            News & Updates
          </h1>
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
        <div className="space-y-10">
          {filteredNews.map((item) => (
            <div key={item.$id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-3 py-1 rounded-full font-medium text-base ${getTypeColor(item.type)}`}>
                      {item.type?.charAt(0).toUpperCase() + item.type?.slice(1) || "Info"}
                    </span>
                    {item.ward_no !== "all" && (
                      <div className="flex items-center text-base text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-blue-700 font-bold text-base">Ward No:-</span>{item.ward_no}
                      </div>
                    )}
                  </div>

                  <h2 className="text-2xl font-semibold text-gray-900 mb-2 mt-5">{item.title}</h2>
                  <p className="text-gray-600 mb-4 mt-5">{item.content}</p>
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-4 md:mt-0">
                  <Calendar className="h-4 w-4 mr-1" />
                  {item.date
                    ? new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
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
  );
}
