"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import AdminSidebar from "../../../components/AdminSidebar"
import QueriesTab from "../../../components/QueriesTab"
import NewsTab from "../../../components/NewsTab"
import authService from "../../../lib/appwrite/auth"
import { logoutAdmin } from "../../../lib/redux/slices/adminAuthSlice"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("queries")
  const router = useRouter()
  const dispatch = useDispatch()
  const admin = useSelector((state) => state.adminAuth.admin)

  useEffect(() => {
    const authStatus = localStorage.getItem("adminAuth")
    if (authStatus !== "true") {
      router.push("/admin/login")
    }
  }, [router])

  const handleLogout = async () => {
    await authService.logout()
    dispatch(logoutAdmin())
    localStorage.removeItem("adminAuth")
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Welcome, {admin?.name || "Admin"}
          </h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
          >
            Logout
          </button>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto px-6 py-4">
          {activeTab === "queries" && <QueriesTab />}
          {activeTab === "news" && <NewsTab />}
        </main>
      </div>
    </div>
  )
}
