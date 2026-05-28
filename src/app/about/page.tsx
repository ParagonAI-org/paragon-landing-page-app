import Link from 'next/link'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

const AboutPage = () => {
  return (
    <div className="bg-[#050505] text-white min-h-screen">
      <Navbar />

      <div className="pt-32 pb-20">
        {/* 1. HERO SECTION */}
        <section className="max-w-[1200px] mx-auto px-6 mb-32">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-12">
            Ensuring AGI benefits <br /> all of humanity.
          </h1>
          <p className="max-w-2xl text-xl md:text-2xl text-gray-400 leading-relaxed font-light">
            ParagonAI is an AI research and deployment company. Our mission is
            to ensure that artificial general intelligence benefits all of
            humanity.
          </p>
        </section>

        {/* 2. VISION IMAGE SECTION */}
        <section className="max-w-[1200px] mx-auto px-6 mb-32">
          <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&q=80&w=2000"
              className="w-full h-full object-cover"
              alt="Vision"
            />
            <div className="absolute bottom-6 right-6 text-[10px] text-white/50 uppercase tracking-widest">
              Illustration: Justin Jay Wang × DALL·E
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                Our vision for the future of AGI
              </h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                Our mission is to ensure that artificial general intelligence—AI
                systems that are generally smarter than humans—benefits all of
                humanity. We are building safe and beneficial AGI, but will also
                consider our mission fulfilled if our work aids others to
                achieve this outcome.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Link
                href="#"
                className="text-xl font-medium border-b border-white/10 pb-4 hover:border-white transition-all cursor-pointer flex justify-between items-center"
              >
                Our plan for AGI <span>→</span>
              </Link>
              <Link
                href="#"
                className="text-xl font-medium border-b border-white/10 pb-4 hover:border-white transition-all cursor-pointer flex justify-between items-center"
              >
                Our Charter <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 3. CAREERS SECTION */}
        <section className="bg-[#1a1a1a] text-white py-24 mb-32 rounded-3xl mx-6 border border-white/5">
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold tracking-tight mb-8 leading-none">
                Join us in shaping the future of technology
              </h2>
              <p className="text-lg mb-10 text-gray-400">
                Developing safe and beneficial AI requires people from a wide
                range of disciplines and backgrounds.
              </p>
              <button type="button" className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all cursor-pointer">
                View all careers
              </button>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" alt="Office" />
              </div>
              </div>
              </section>

              {/* 4. RESEARCH / PRODUCT CARDS */}
              <section className="max-w-[1200px] mx-auto px-6 mb-32">
              <div className="flex justify-between items-end mb-12">
              <h2 className="text-4xl font-bold tracking-tight">Latest from ParagonAI</h2>
              <button type="button" className="text-sm font-bold border-b border-white/30 hover:border-white pb-1 cursor-pointer">Read more</button>
              </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                cat: 'Research',
                tag: 'Geometry',
                title:
                  'Paragon model disproved a central conjecture in discrete geometry',
                img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600',
              },
              {
                cat: 'Product',
                tag: 'API',
                title:
                  'Advancing voice intelligence with new models in the API',
                img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600',
              },
              {
                cat: 'Safety',
                tag: 'System Card',
                title: 'GPT-5.5 Instant System Card and Safety analysis',
                img: 'https://images.unsplash.com/photo-1614728263952-84ea206f99b6?auto=format&fit=crop&q=80&w=600',
              },
              {
                cat: 'Product',
                tag: 'Release',
                title:
                  'GPT-5.5 Instant: smarter, clearer, and more personalized',
                img: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600',
              },
            ].map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 mb-4">
                  <img
                    src={item.img}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={item.title}
                  />
                </div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                  {item.cat} • {item.tag}
                </p>
                <h3 className="text-sm font-semibold leading-snug group-hover:text-gray-300 transition-colors">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* 5. STRUCTURE SECTION */}
        <section className="max-w-[1200px] mx-auto px-6 mb-32 py-24 border-y border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-8">
                Our structure
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                ParagonAI consists of the nonprofit Paragon Foundation and the
                for-profit Paragon Group. The Foundation governs the Group,
                which operates as a public benefit corporation.
              </p>
              <button type="button" className="text-sm font-bold border-b border-white/30 hover:border-white pb-1 cursor-pointer">Learn about our structure</button>

            </div>
            <div className="aspect-video bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-3xl flex items-center justify-center p-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full mx-auto mb-6 flex items-center justify-center text-black font-black text-2xl">
                  P
                </div>
                <div className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">
                  Paragon Foundation
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}

export default AboutPage
