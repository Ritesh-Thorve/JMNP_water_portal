"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Droplets } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import { getTranslation } from "../utils/translations"
import LanguageSwitcher from "./LanguageSwitcher"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguage()

  const t = (key) => getTranslation(language, key)

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Droplets className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">AquaFlow</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {t("home")}
            </Link>
            <Link
              href="/news"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {t("news")}
            </Link>
            <Link
              href="/submit-query"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {t("submitQuery")}
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {t("aboutUs")}
            </Link>
            <Link
              href="/water-info"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {t("waterInfo")}
            </Link>
            <LanguageSwitcher />
            <Link
              href="/admin/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              {t("adminLogin")}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
              <Link
                href="/"
                className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                {t("home")}
              </Link>
              <Link
                href="/news"
                className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                {t("news")}
              </Link>
              <Link
                href="/submit-query"
                className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                {t("submitQuery")}
              </Link>
              <Link
                href="/about"
                className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                {t("aboutUs")}
              </Link>
              <Link
                href="/water-info"
                className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                {t("waterInfo")}
              </Link>
              <Link
                href="/admin/login"
                className="block bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
              >
                {t("adminLogin")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
