import ContentSection from '@/components/ContentSection'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import ProductsSection from '@/components/ProductsSection'

const Home = () => {
  return (
    <main className="relative flex min-h-screen flex-col bg-black font-sans selection:bg-blue-500 selection:text-white">
      <div className="noise-bg" />

      {/* Hero owns its own background (see Hero.tsx) so the bg sizes
          with the section's content instead of the viewport. */}
      <Navbar />
      <Hero />
      <ProductsSection />

      <div className="relative z-10 w-full">
        <ContentSection />
        <Footer />
      </div>
    </main>
  )
}

export default Home
