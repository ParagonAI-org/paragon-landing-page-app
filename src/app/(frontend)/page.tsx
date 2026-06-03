import AuroraEffect from '@/components/AuroraEffect'
import ContentSection from '@/components/ContentSection'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'

const Home = () => {
  return (
    <div className="min-h-screen relative flex flex-col font-sans selection:bg-blue-500 selection:text-white bg-[#030303]">
      <div className="noise-bg"></div>
      <div className="relative h-screen">
        <AuroraEffect />
        <Navbar />
        <Hero />
      </div>
      <ContentSection />
      <Footer />
    </div>
  )
}

export default Home
