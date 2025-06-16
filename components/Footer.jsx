"use client"

import { Droplets, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import { getTranslation } from "../utils/translations"

export default function Footer() {
  const { language } = useLanguage()
  const t = (key) => getTranslation(language, key)

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src="jnmp_logo.jpg" alt="JMNP-Img" className="h-8 w-8"/>
              <span className="text-xl font-bold">JMNP WaterSupply </span>
            </div>
            <p className="text-gray-300 mb-4">{t("footerDesc")}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-blue-400 transition-colors">
                  {t("home")}
                </a>
              </li>
              <li>
                <a href="/news" className="text-gray-300 hover:text-blue-400 transition-colors">
                  {t("news")}
                </a>
              </li>
              <li>
                <a href="/submit-query" className="text-gray-300 hover:text-blue-400 transition-colors">
                  {t("submitQuery")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("contactInfo")}</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">+91 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">info@jmnpwatersupport.gov</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">Golany Market, Jalgaon</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            &copy; {new Date().getFullYear()} JMNP Water Management. {t("allRightsReserved")}.
          </p>

        </div>
      </div>
    </footer>
  )
}
