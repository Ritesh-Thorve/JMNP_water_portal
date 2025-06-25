"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Upload, Send, CheckCircle } from "lucide-react";
import service from "../../lib/appwrite/service";

export default function SubmitQuery() {
  const [formData, setFormData] = useState({
    full_name: "",
    phone_no: "",
    ward_no: "",
    issue_type: "",
    message: "",
    image: null,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const wards = Array.from({ length: 20 }, (_, i) => i + 1);

  const issue_types = [
    "No Water Supply",
    "Low Water Pressure",
    "Water Quality Issues",
    "Pipeline Leakage",
    "Billing Issues",
    "Meter Problems",
    "Emergency Repair",
    "Other",
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await service.submitQuery({
        full_name: formData.full_name,
        phone_no: formData.phone_no,
        ward_no: formData.ward_no,
        issue_type: formData.issue_type,
        message: formData.message,
        image: formData.image,
      });

      setIsSubmitted(true);
      setFormData({
        full_name: "",
        phone_no: "",
        ward_no: "",
        issue_type: "",
        message: "",
        image: null,
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);

    } catch (error) {
      console.error("Failed to submit query:", error);
      alert("Something went wrong! Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Query Submitted Successfully!
            </h2>
            <p className="text-gray-600 mb-4">
              Thank you for your submission. We have received your query and
              will respond within 24 hours.
            </p>
            <p className="text-sm text-gray-500">
              You will receive a confirmation phone_no message shortly with your
              query reference number.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Submit a Query
          </h1>
          <p className="text-lg text-gray-600">
            Report water supply issues, request assistance, or ask questions
            about our services.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="full_name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  required
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="phone_no"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone No *
                </label>
                <input
                  type="phone_no"
                  id="phone_no"
                  name="phone_no"
                  required
                  value={formData.phone_no}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone no"
                />
              </div>
            </div>

            {/* Ward and Issue Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="ward_no"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Ward Number *
                </label>
                <select
                  id="ward_no"
                  name="ward_no"
                  required
                  value={formData.ward_no}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select your ward</option>
                  {wards.map((ward) => (
                    <option key={ward} value={ward}>
                      Ward {ward}
                    </option>
                  ))}
                </select>
              </div>

              {/* Issue Type */}
              <div>
                <label
                  htmlFor="issue_type"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Issue Type *
                </label>
                <select
                  id="issue_type"
                  name="issue_type"
                  required
                  value={formData.issue_type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select issue type</option>
                  {issue_types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Detailed Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Please describe your issue in detail..."
              />
            </div>

            {/* Image Upload */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Upload Image (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Click to upload or drag and drop an image
                </p>
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
                {formData.image && (
                  <p className="mt-2 text-sm text-green-600">
                    Selected: {formData.image.name}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Submit Query</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
