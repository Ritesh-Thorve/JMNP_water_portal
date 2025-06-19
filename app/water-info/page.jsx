"use client"

import { useState } from "react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import {Droplets, Leaf, Globe, Heart, AlertTriangle, CheckCircle, Home,
ShowerHeadIcon as Shower, Utensils, TreePine, Factory, Users, Calculator,
} from "lucide-react"
import Link from "next/link"

export default function WaterInfo() {
  const [activeTab, setActiveTab] = useState("importance")

  const tabs = [
    {
      id: "importance",
      label: "Importance",
      icon: <Leaf className="h-5 w-5" />,
    },
    {
      id: "conservation",
      label: "Conservation",
      icon: <Droplets className="h-5 w-5" />,
    },
    {
      id: "cycle",
      label: "Water Cycle",
      icon: <Globe className="h-5 w-5" />,
    },
  ];

  const waterFacts = [
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: "71% of Earth is Water",
      description: "Only 2.5% is freshwater, and less than 1% is accessible for human use",
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "2 Billion People",
      description: "Lack access to safely managed drinking water at home",
    },
    {
      icon: <Heart className="h-8 w-8 text-red-600" />,
      title: "Human Body is 60% Water",
      description: "We need water for every bodily function to survive",
    },
    {
      icon: <TreePine className="h-8 w-8 text-green-700" />,
      title: "Agriculture Uses 70%",
      description: "Of global freshwater consumption goes to agriculture",
    },
  ]

  const conservationTips = [
    {
      category: "Bathroom",
      icon: <Shower className="h-6 w-6 text-blue-600" />,
      tips: [
        "Take shorter showers (5 minutes or less)",
        "Fix leaky faucets and toilets immediately",
        "Install low-flow showerheads and faucets",
        "Turn off water while brushing teeth or shaving",
        "Use a bucket to collect cold water while waiting for hot water",
      ],
    },
    {
      category: "Kitchen",
      icon: <Utensils className="h-6 w-6 text-green-600" />,
      tips: [
        "Run dishwasher only with full loads",
        "Scrape dishes instead of rinsing before loading",
        "Keep a pitcher of drinking water in the refrigerator",
        "Use a basin to wash fruits and vegetables",
        "Collect pasta or vegetable cooking water for plants",
      ],
    },
    {
      category: "Laundry",
      icon: <Home className="h-6 w-6 text-purple-600" />,
      tips: [
        "Wash full loads of laundry",
        "Use cold water when possible",
        "Choose water-efficient washing machines",
        "Reuse towels multiple times before washing",
        "Air dry clothes instead of using dryer",
      ],
    },
    {
      category: "Outdoor",
      icon: <TreePine className="h-6 w-6 text-green-700" />,
      tips: [
        "Water plants early morning or evening",
        "Use drip irrigation or soaker hoses",
        "Collect rainwater for gardening",
        "Choose drought-resistant plants",
        "Use a broom instead of hose to clean driveways",
      ],
    },
  ]

  const waterCycle = [
    {
      step: "Evaporation",
      description: "Sun heats water in oceans, lakes, and rivers, turning it into water vapor",
      icon: "☀️",
    },
    {
      step: "Condensation",
      description: "Water vapor rises and cools, forming clouds in the atmosphere",
      icon: "☁️",
    },
    {
      step: "Precipitation",
      description: "Water falls back to Earth as rain, snow, sleet, or hail to return its level",
      icon: "🌧️",
    },
    {
      step: "Collection",
      description: "Water flows into rivers, lakes, and underground aquifers",
      icon: "🏞️",
    },
  ]

  const dailyWaterUsage = [
    {
      activity: "Shower (10 min)",
      usage: 95,
      icon: <Shower className="h-5 w-5 text-blue-600" />,
    },
    {
      activity: "Toilet Flush",
      usage: 15,
      icon: <Home className="h-5 w-5 text-blue-600" />,
    },
    {
      activity: "Teeth Brushing",
      usage: 8,
      icon: <Home className="h-5 w-5 text-blue-600" />,
    },
    {
      activity: "Hand Washing",
      usage: 4,
      icon: <Home className="h-5 w-5 text-blue-600" />,
    },
    {
      activity: "Dishwashing",
      usage: 30,
      icon: <Utensils className="h-5 w-5 text-blue-600" />,
    },
    {
      activity: "Laundry",
      usage: 70,
      icon: <Home className="h-5 w-5 text-blue-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Droplets className="h-16 w-16 mx-auto mb-6 text-blue-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Water: Our Most Precious Resource</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Learn about the importance of water conservation and how you can make a difference
            </p>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Water Facts</h2>
            <p className="text-lg text-gray-600">Essential facts about our planet's water resources</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {waterFacts.map((fact, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">{fact.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{fact.title}</h3>
                <p className="text-gray-600 text-sm">{fact.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabbed Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-12 border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 font-medium transition-colors ${activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                  }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "importance" && (
            <div className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Water is Essential</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Water is fundamental to all life on Earth. Understanding its importance helps us appreciate why
                  conservation matters.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Heart className="h-6 w-6 text-red-600 mr-2" />
                      Human Health
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Regulates body temperature through sweating and respiration</li>
                      <li>• Transports nutrients and oxygen to cells</li>
                      <li>• Removes waste products from the body</li>
                      <li>• Lubricates joints and cushions organs</li>
                      <li>• Maintains blood pressure and supports circulation</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <TreePine className="h-6 w-6 text-green-600 mr-2" />
                      Environmental Impact
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Supports all ecosystems and biodiversity</li>
                      <li>• Maintains soil health for agriculture</li>
                      <li>• Regulates Earth's climate and weather patterns</li>
                      <li>• Provides habitat for countless species</li>
                      <li>• Enables photosynthesis in plants</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Factory className="h-6 w-6 text-yellow-600 mr-2" />
                      Economic Importance
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Essential for agriculture and food production</li>
                      <li>• Required for manufacturing and industry</li>
                      <li>• Supports tourism and recreation</li>
                      <li>• Generates hydroelectric power</li>
                      <li>• Enables transportation via waterways</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
                      Water Scarcity Crisis
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• 2 billion people lack safe drinking water</li>
                      <li>• 3.6 billion face water scarcity at least one month per year</li>
                      <li>• Climate change is worsening water stress</li>
                      <li>• Population growth increases demand</li>
                      <li>• Pollution reduces available clean water</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "conservation" && (
            <div className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Water Conservation Tips</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Simple changes in daily habits can significantly reduce water consumption and help preserve this
                  precious resource.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {conservationTips.map((category, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
                    <div className="flex items-center mb-4">
                      {category.icon}
                      <h3 className="text-xl font-semibold text-gray-900 ml-3">{category.category}</h3>
                    </div>
                    <ul className="space-y-3">
                      {category.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Daily Water Usage */}
              <div className="bg-blue-50 p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Average Daily Water Usage</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dailyWaterUsage.map((item, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {item.icon}
                        <span className="font-medium text-gray-900">{item.activity}</span>
                      </div>
                      <span className="text-blue-600 font-bold">{item.usage}L</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "cycle" && (
            <div className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">The Water Cycle</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Understanding how water moves through our environment helps us appreciate its continuous journey and
                  finite nature.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {waterCycle.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-white p-8 rounded-xl shadow-lg mb-4">
                      <div className="text-6xl mb-4">{step.icon}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.step}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                    {index < waterCycle.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                        <div className="w-8 h-0.5 bg-blue-300"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why the Water Cycle Matters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Natural Purification</h4>
                    <p className="text-gray-700 mb-4">
                      The water cycle naturally filters and purifies water as it moves through the environment.
                    </p>

                    <h4 className="font-semibold text-gray-900 mb-2">Climate Regulation</h4>
                    <p className="text-gray-700">
                      Water cycle helps regulate Earth's temperature and weather patterns.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Renewable Resource</h4>
                    <p className="text-gray-700 mb-4">
                      The cycle makes water a renewable resource, but pollution and overuse can disrupt it.
                    </p>

                    <h4 className="font-semibold text-gray-900 mb-2">Ecosystem Support</h4>
                    <p className="text-gray-700">All ecosystems depend on the water cycle for survival and balance.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Every Drop Counts</h2>
          <p className="text-xl mb-8 text-green-100">
            Start conserving water today and be part of the solution for a sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/submit-query"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Report Water Issues
            </Link>
            <Link
              href="/news"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              Stay Updated
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
