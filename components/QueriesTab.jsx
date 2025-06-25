"use client";

import { useEffect, useState } from "react";
import {
  Eye,
  Search,
  Calendar,
  MapPin,
  Phone,
  User,
  ImageIcon,
  X,
  Trash2,
} from "lucide-react";
import service from "../lib/appwrite/service";

export default function QueriesTab() {
  const [queriesData, setQueriesData] = useState([]);
  const [selectedWard, setSelectedWard] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuery, setSelectedQuery] = useState(null);

  const wards = ["all", ...Array.from({ length: 20 }, (_, i) => `${i + 1}`)];
  const statuses = ["all", "pending", "in-progress", "resolved"];

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const res = await service.getAllQueries();
        const formatted = res.documents.map((doc) => ({
          id: doc.$id,
          full_name: doc.full_name,
          ward_no: doc.ward_no,
          issue_type: doc.issue_type,
          message: doc.message,
          phone_no: doc.phone_no,
          image: doc.image,
          status: doc.status || "pending",
          submittedAt: doc.$createdAt,
          hasImage: !!doc.image,
        }));
        setQueriesData(formatted);
      } catch (error) {
        console.error("Failed to fetch queries", error);
      }
    };

    fetchQueries();
  }, []);

  const filteredQueries = queriesData.filter((query) => {
    const matchesWard =
      selectedWard === "all" || query.wardNumber === selectedWard;
    const matchesStatus =
      selectedStatus === "all" || query.status === selectedStatus;

    const matchesSearch =
      query.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.issueType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesWard && matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const updateQueryStatus = (queryId, newStatus) => {
    setQueriesData((prev) =>
      prev.map((query) =>
        query.id === queryId ? { ...query, status: newStatus } : query
      )
    );
    if (selectedQuery && selectedQuery.id === queryId) {
      setSelectedQuery({ ...selectedQuery, status: newStatus });
    }
    // Optional: Call Appwrite to update status
    service.updateQueryStatus?.(queryId, newStatus);
  };

  const deleteQuery = async (queryId) => {
    if (window.confirm("Are you sure you want to delete this query?")) {
      setQueriesData((prev) => prev.filter((q) => q.id !== queryId));
      if (selectedQuery && selectedQuery.id === queryId) {
        setSelectedQuery(null);
      }
      await service.deleteQuery?.(queryId);
    }
  };

  const getStatusStats = () => {
    const stats = {
      total: queriesData.length,
      pending: queriesData.filter((q) => q.status === "pending").length,
      inProgress: queriesData.filter((q) => q.status === "in-progress").length,
      resolved: queriesData.filter((q) => q.status === "resolved").length,
    };
    return stats;
  };

  const stats = getStatusStats();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Queries</h1>
          <p className="text-gray-600">
            View, update, and manage user queries and complaints.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Queries", value: stats.total, color: "gray" },
          { label: "Pending", value: stats.pending, color: "yellow" },
          { label: "In Progress", value: stats.inProgress, color: "blue" },
          { label: "Resolved", value: stats.resolved, color: "green" },
        ].map((stat, i) => (
          <div
            key={i}
            className={`bg-white p-4 rounded-lg shadow border-l-4 border-${stat.color}-400`}
          >
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            <p className={`text-2xl font-bold text-${stat.color}-600`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ward
          </label>
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status === "all"
                  ? "All Status"
                  : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <p className="text-sm text-gray-500">
            Showing {filteredQueries.length} of {queriesData.length} queries
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Query Details", "Contact", "Status", "Date", "Actions"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQueries.map((query) => (
                <tr key={query.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {query.issueType}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Ward {query.ward_no}
                    </div>
                    <p className="text-sm text-gray-600">
                      Message: {query.message}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-gray-900 text-sm">
                      <User className="h-4 w-4 mr-1" />
                      {query.full_name}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Phone className="h-4 w-4 mr-1" />
                      {query.phone_no}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={query.status}
                      onChange={(e) =>
                        updateQueryStatus(query.id, e.target.value)
                      }
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        query.status
                      )} focus:outline-none focus:ring-2`}
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
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedQuery(query)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteQuery(query.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredQueries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No queries found matching your filters.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-bold text-gray-900">Query Details</h2>
              <button
                onClick={() => setSelectedQuery(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <p>
                <strong>Full Name:</strong> {selectedQuery.full_name}
              </p>
              <p>
                <strong>Phone:</strong> {selectedQuery.phone_no}
              </p>
              <p>
                <strong>Ward Number:</strong> Ward {selectedQuery.ward_no}
              </p>
              <p>
                <strong>Issue:</strong> {selectedQuery.issue_type}
              </p>
              <p>
                <strong>Message:</strong> {selectedQuery.message}
              </p>
              {selectedQuery.image && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Attached Image
                  </label>
                  <img
                    src={service.getFilePreview(selectedQuery.image)}
                    alt="Query attachment"
                    className="w-full max-w-md h-48 object-contain rounded-md border"
                  />
                </div>
              )}

              <div className="text-sm text-gray-500">
                Submitted:{" "}
                {new Date(selectedQuery.submittedAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
