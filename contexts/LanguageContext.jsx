"use client"
import { createContext, useContext, useState, useEffect } from "react"

// ✅ Provide default value to avoid React 418 error
const LanguageContext = createContext({
  language: "english",
  changeLanguage: () => {},
})

// ✅ Custom hook
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// ✅ Provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("english")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage")
    if (savedLanguage && ["english", "hindi", "marathi"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage)
    localStorage.setItem("selectedLanguage", newLanguage)
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
