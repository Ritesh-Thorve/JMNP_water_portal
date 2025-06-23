"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { loginAdmin } from "../../../lib/redux/slices/adminAuthSlice"
import authService from "../../../lib/appwrite/auth"
import { Shield, AlertTriangle } from "lucide-react"

export default function AdminSignup() {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    accessCode: "",
  })

  const [error, setError] = useState("")
  const [showAccessDenied, setShowAccessDenied] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    const { fullName, email, username, password, confirmPassword, accessCode } = formData

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (accessCode !== "AQUAFLOW@2024") {
      setShowAccessDenied(true)
      return
    }

    try {
      const session = await authService.createAccount({
        email,
        password,
        name: fullName,
      })

      const userData = await authService.getCurrentUser()

      // Dispatch login info to Redux
      dispatch(loginAdmin(userData))

      // Optional: Redirect to admin dashboard
      window.location.href = "/admin/dashboard"

    } catch (err) {
      console.error(err)
      setError("Failed to create admin account")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Registration</h1>
          <p className="text-gray-600 mt-2">Create a new administrator account</p>
        </div>

        {!showAccessDenied ? (
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {["fullName", "email", "username", "password", "confirmPassword", "accessCode"].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-2">
                  {field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
                <input
                  type={field.toLowerCase().includes("password") ? "password" : "text"}
                  id={field}
                  name={field}
                  required
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder={`Enter ${field}`}
                />
              </div>
            ))}

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              Create Admin Account
            </button>
          </form>
        ) : (
          // Access Denied UI
          <div className="text-center">
            <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="h-10 w-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <p className="text-red-800 font-medium mb-3">Registration Restricted</p>
              <p className="text-red-700 text-sm leading-relaxed">
                Admin account creation is restricted to authorized personnel only. New administrator accounts can only
                be created by existing super administrators through the internal management system.
              </p>
            </div>
            <button
              onClick={() => setShowAccessDenied(false)}
              className="mt-6 text-red-600 hover:text-red-800 font-medium"
            >
              ← Back to Form
            </button>
          </div>
        )}

        {/* Already have account */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/admin/login" className="text-red-600 hover:text-red-800 font-medium">
              Sign in here
            </a>
          </p>
        </div>

        {/* Security Notice */}
        {!showAccessDenied && (
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">Security Notice</p>
                <p>Admin registration requires proper authorization. Unauthorized attempts are logged and monitored.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
