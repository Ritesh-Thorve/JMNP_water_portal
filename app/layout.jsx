import "./globals.css"
import { Inter } from "next/font/google"
import { LanguageProvider } from "../contexts/LanguageContext"
import { Providers } from "../lib/store/providers"
import { store } from "../store/store"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "JMNP-Water Management System",
  description: "Municipal Water Supply Management Portal",
};

export default function RootLayout({ children }) {
  return (
    <Providers >
      <html lang="en">
        <head>
          <link rel="icon" href="/jnmp_logo.jpg" sizes="any" />
        </head>
        <body className={inter.className}>
          <LanguageProvider>{children}</LanguageProvider>
        </body>
      </html>
    </Providers>
  );
}
