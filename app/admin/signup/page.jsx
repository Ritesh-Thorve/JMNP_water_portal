"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { loginAdmin } from "../../../lib/redux/slices/adminAuthSlice"
import authService from "../../../lib/appwrite/auth"
import { Shield, AlertTriangle, Lock, User, Mail, Key } from "lucide-react"

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
    <div className="min-h-screen bg-gradient-to-br from-red-700 via-red-600 to-red-800 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Decorative header */}
        <div className="bg-red-600 py-4 px-6">
          <div className="flex items-center justify-center space-x-3">
            <Shield className="h-8 w-8 text-white" />
            <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
          </div>
        </div>

        <div className="p-8">
          {/* Form header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Create Admin Account</h2>
            <p className="text-gray-600 mt-2">Restricted access for authorized personnel</p>
          </div>

          {!showAccessDenied ? (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {[
                { field: "fullName", icon: <User className="h-5 w-5 text-gray-400" /> },
                { field: "email", icon: <Mail className="h-5 w-5 text-gray-400" /> },
                { field: "username", icon: <User className="h-5 w-5 text-gray-400" /> },
                { field: "password", icon: <Lock className="h-5 w-5 text-gray-400" /> },
                { field: "confirmPassword", icon: <Lock className="h-5 w-5 text-gray-400" /> },
                { field: "accessCode", icon: <Key className="h-5 w-5 text-gray-400" /> },
              ].map(({ field, icon }) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-2">
                    {field
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {icon}
                    </div>
                    <input
                      type={field.toLowerCase().includes("password") ? "password" : "text"}
                      id={field}
                      name={field}
                      required
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder={`Enter ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                    />
                  </div>
                </div>
              ))}

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg"
              >
                Register Admin Account
              </button>
            </form>
          ) : (
            // Access Denied UI
            <div className="text-center">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="h-10 w-10 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mb-6 text-left">
                <p className="text-red-800 font-medium mb-3">Unauthorized Access Attempt</p>
                <p className="text-red-700 text-sm leading-relaxed">
                  Administrator registration requires valid authorization credentials. 
                  Please contact your system administrator if you believe you should have access.
                </p>
              </div>
              <button
                onClick={() => setShowAccessDenied(false)}
                className="mt-6 text-red-600 hover:text-red-800 font-medium flex items-center justify-center mx-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Return to Registration
              </button>
            </div>
          )}

          {/* Footer links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Already have an account?{" "}
              <a href="/admin/login" className="text-red-600 hover:text-red-800 font-medium transition-colors">
                Sign in here
              </a>
            </p>
          </div>

          {/* Security Notice */}
          {!showAccessDenied && (
            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-yellow-800">Security Notice</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    All registration attempts are monitored and logged. Unauthorized access will be reported.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}