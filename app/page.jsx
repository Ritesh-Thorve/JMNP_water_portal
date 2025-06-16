import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import HomeContent from "../components/HomeContent"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HomeContent />
      <Footer />
    </div>
  )
}
