"use client"

import { useState } from "react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { MapPin, Phone, Mail, Clock, Users, Award, Target, Eye, Heart, Navigation, Locate } from "lucide-react"

export default function About() {
  const achievements = [
    {
      icon: <Award className="h-8 w-8 text-yellow-600" />,
      title: "Excellence in Public Service",
      year: "2023",
      description: "Awarded by State Water Management Authority",
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "100% Service Coverage",
      year: "2022",
      description: "First municipality to achieve complete ward coverage",
    },
    {
      icon: <Heart className="h-8 w-8 text-red-600" />,
      title: "Community Choice Award",
      year: "2021",
      description: "Voted best water service provider by residents",
    },
  ]

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-blue-600" />,
      title: "Phone Numbers",
      details: ["Main Office: +1 (555) 123-4567", "Emergency: +1 (555) 911-WATER", "Billing: +1 (555) 123-BILL"],
    },
    {
      icon: <Mail className="h-6 w-6 text-green-600" />,
      title: "Email Addresses",
      details: ["General: info@jmnpwatersupply.gov", "Support: support@jmnpwatersupply.gov", "Emergency: emergency@jmnpwatersupply.gov"],
    },
    {
      icon: <Clock className="h-6 w-6 text-orange-600" />,
      title: "Office Hours",
      details: [
        "Monday - Friday: 8:00 AM - 6:00 PM",
        "Saturday: 9:00 AM - 2:00 PM",
        "Sunday: Emergency only",
        "24/7 Emergency Response",
      ],
    },
    {
      icon: <MapPin className="h-6 w-6 text-purple-600" />,
      title: "Office Locations",
      details: [
        "Main Office: Golany Market, Jalgaon",
        "North Branch: 456 North District St",
        "South Branch: 789 South Service Rd",
      ],
    },
  ]

  // Headquarters location (example coordinates)
  const hqLocation = {
    address: "Golany Market, Jalgaon",
    lat: 21.007657,
    lng: 75.562603,
  }

  const [userLocation, setUserLocation] = useState(null)
  const [locationError, setLocationError] = useState(null)

  // Haversine formula to calculate distance between two lat/lng points in km
  function calculateDistance(lat1, lon1, lat2, lon2) {
    function toRad(x) {
      return (x * Math.PI) / 180
    }
    const R = 6371 // km
    const dLat = toRad(lat2 - lat1)
    const dLon = toRad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return (R * c).toFixed(2)
  }

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.")
      return
    }
    setLocationError(null)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      (error) => {
        setLocationError("Unable to retrieve your location.")
      }
    )
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About JMNP WaterSupply</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Dedicated to providing clean, reliable water supply and exceptional service to our community for over 25
              years
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To ensure every resident has access to clean, safe, and reliable water supply while maintaining the
                highest standards of service and environmental responsibility.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Eye className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the leading municipal water management system, setting benchmarks for quality, innovation, and
                community service in water supply management.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <p className="text-gray-600">
                Integrity, reliability, sustainability, and community-first approach guide everything we do. We believe
                in transparent communication and continuous improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to serving over more than1,00,0000 residents across 20+ wards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-2 mt-1">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">1999 - Foundation</h4>
                    <p className="text-gray-600">Established as a municipal water authority serving 5 wards</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-2 mt-1">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">2005 - Expansion</h4>
                    <p className="text-gray-600">Extended services to 15 wards with improved infrastructure</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-2 mt-1">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">2015 - Modernization</h4>
                    <p className="text-gray-600">Implemented digital monitoring and smart water management systems</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-2 mt-1">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">2024 - Complete Coverage</h4>
                    <p className="text-gray-600">Achieved 100% coverage across all 20 wards with 24/7 service</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
                  <div className="text-sm text-gray-600">Years of Service</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">100K+</div>
                  <div className="text-sm text-gray-600">Residents Served</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">20</div>
                  <div className="text-sm text-gray-600">Wards Covered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime Record</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-lg text-gray-600">Multiple ways to reach us for all your water management needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((contact, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  {contact.icon}
                  <h3 className="text-lg font-semibold text-gray-900 ml-3">{contact.title}</h3>
                </div>
                <div className="space-y-2">
                  {contact.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
