"use client"

import { useLanguage } from "../contexts/LanguageContext"
import { getTranslation } from "../utils/translations"
import { Droplets, Shield, Clock, Users } from "lucide-react"

export default function HomeContent() {
  const { language } = useLanguage()
  const t = (key) => getTranslation(language, key)

  const features = [
    {
      icon: <Droplets className="h-8 w-8 text-blue-600" />,
      title: t("service1Title"),
      description: t("service1Desc"),
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: t("service2Title"),
      description: t("service2Desc"),
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-600" />,
      title: t("service3Title"),
      description: t("service3Desc"),
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: t("service4Title"),
      description: t("service4Desc"),
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{t("heroTitle")}</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">{t("heroSubtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/news"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {t("viewUpdates")}
              </a>
              <a
                href="/submit-query"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                {t("reportIssue")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("ourServices")}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("servicesDescription")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">{t("wardsCovered")}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">{t("uptime")}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">{t("support")}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100K+</div>
              <div className="text-blue-100">{t("residentsServed")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("needHelp")}</h2>
          <p className="text-lg text-gray-600 mb-8">{t("needHelpDesc")}</p>
          <a
            href="/submit-query"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {t("submitQuery")}
          </a>
        </div>
      </section>
    </>
  )
}
