"use client"

import { useState } from "react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { MapPin, Phone, Mail, Clock, Users, Award, Target, Eye, Heart, Navigation, Locate } from "lucide-react"

export default function About() {
  const [userLocation, setUserLocation] = useState(null)
  const [locationError, setLocationError] = useState("")

  // Company headquarters location
  const hqLocation = {
    lat: 40.7128,
    lng: -74.006,
    address: "123 Water Management Ave, City Hall Complex, Downtown",
  }

  const teamMembers = [
    {
      name: "Dr. Sarah Mitchell",
      position: "Chief Water Engineer",
      experience: "15+ years",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Michael Rodriguez",
      position: "Operations Manager",
      experience: "12+ years",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Emily Chen",
      position: "Quality Assurance Director",
      experience: "10+ years",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "James Thompson",
      position: "Customer Relations Head",
      experience: "8+ years",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

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
      details: ["General: info@aquaflow.gov", "Support: support@aquaflow.gov", "Emergency: emergency@aquaflow.gov"],
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
        "Main Office: 123 Water Management Ave",
        "North Branch: 456 North District St",
        "South Branch: 789 South Service Rd",
      ],
    },
  ]

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setLocationError("")
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Location access denied by user.")
            break
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location information is unavailable.")
            break
          case error.TIMEOUT:
            setLocationError("Location request timed out.")
            break
          default:
            setLocationError("An unknown error occurred.")
            break
        }
      },
    )
  }

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371 // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c // Distance in kilometers
    return d.toFixed(1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About AquaFlow</h1>
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
              From humble beginnings to serving over 100,000 residents across 20 wards
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

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-lg text-gray-600">
              Experienced professionals dedicated to excellence in water management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.position}</p>
                  <p className="text-sm text-gray-600">{member.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Achievements</h2>
            <p className="text-lg text-gray-600">Recognition for our commitment to excellence and community service</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl text-center">
                <div className="mb-4">{achievement.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                <p className="text-lg font-medium text-blue-600 mb-2">{achievement.year}</p>
                <p className="text-gray-600">{achievement.description}</p>
              </div>
            ))}
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

      {/* Location & Map */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Find Us</h2>
            <p className="text-lg text-gray-600">
              Visit our main office or use the location services to find the nearest branch
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Location Info */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Main Office</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                    <p className="text-gray-600">{hqLocation.address}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-green-600" />
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-red-600" />
                    <p className="text-gray-600">info@aquaflow.gov</p>
                  </div>
                </div>
              </div>

              {/* Geolocation */}
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Location</h3>
                <button
                  onClick={getCurrentLocation}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2 mb-4"
                >
                  <Locate className="h-5 w-5" />
                  <span>Get My Location</span>
                </button>

                {locationError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
                    {locationError}
                  </div>
                )}

                {userLocation && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <strong>Your coordinates:</strong>
                      <br />
                      Latitude: {userLocation.lat.toFixed(6)}
                      <br />
                      Longitude: {userLocation.lng.toFixed(6)}
                    </p>
                    <p className="text-sm text-blue-600 font-medium">
                      Distance to main office:{" "}
                      {calculateDistance(userLocation.lat, userLocation.lng, hqLocation.lat, hqLocation.lng)} km
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-xl overflow-hidden">
              <div className="h-96 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                <div className="text-center">
                  <Navigation className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Interactive Map</h4>
                  <p className="text-gray-600 max-w-xs">
                    In a real implementation, this would show an interactive map with our office locations and service
                    areas.
                  </p>
                  <div className="mt-4 space-y-2 text-sm text-gray-500">
                    <p>📍 Main Office: City Hall Complex</p>
                    <p>📍 North Branch: North District</p>
                    <p>📍 South Branch: South Service Area</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
