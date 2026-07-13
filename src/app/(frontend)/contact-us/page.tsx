'use client';

const ContactUsPage = () => {
  return (
    <>
      {/* Contact Hero */}
      <section className="relative pt-48 pb-24 overflow-hidden z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-3xl reveal opacity-0 translate-y-[30px] transition-all duration-900 ease-out-expo [&.visible]:opacity-100 [&.visible]:translate-y-0" suppressHydrationWarning>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-[#818CF8] font-bold mb-8">
              <span className="w-1.5 h-1.5 bg-[#818CF8] rounded-full"></span>
              Contact Us
            </div>
            <h1 className="text-6xl md:text-8xl font-medium leading-[0.95] tracking-tight mb-8 text-white">
              Let's talk about<br />
              <span className="text-[#818CF8] italic font-normal">what's next.</span>
            </h1>
            <p className="text-xl text-[#94A3B8] leading-relaxed font-light mb-12">
              Whether you're a student, educator, institution, or investor—we'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-24 relative z-10 bg-[#0B0F1A] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="reveal opacity-0 translate-y-[30px] transition-all duration-900 ease-out-expo [&.visible]:opacity-100 [&.visible]:translate-y-0" suppressHydrationWarning>
              <h2 className="font-display text-3xl text-white mb-8">Get in touch</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-widest text-[#94A3B8] mb-2">Email</h3>
                  <a href="mailto:hello@paragonai.com" className="text-xl text-white hover:text-[#818CF8] transition-colors">
                    hello@paragonai.com
                  </a>
                </div>
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-widest text-[#94A3B8] mb-2">Location</h3>
                  <p className="text-xl text-white">Addis Ababa, Ethiopia</p>
                </div>
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-widest text-[#94A3B8] mb-2">Social</h3>
                  <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#818CF8]/40 hover:bg-[#818CF8]/10 transition-all" aria-label="X (Twitter)">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#818CF8]/40 hover:bg-[#818CF8]/10 transition-all" aria-label="LinkedIn">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#818CF8]/40 hover:bg-[#818CF8]/10 transition-all" aria-label="GitHub">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.682.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="reveal opacity-0 translate-y-[30px] transition-all duration-900 ease-out-expo delay-100 [&.visible]:opacity-100 [&.visible]:translate-y-0" suppressHydrationWarning>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="name" className="block text-sm font-mono uppercase tracking-widest text-[#94A3B8] mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full bg-[#161B29] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#818CF8]/50 focus:ring-1 focus:ring-[#818CF8]/50 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-mono uppercase tracking-widest text-[#94A3B8] mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full bg-[#161B29] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#818CF8]/50 focus:ring-1 focus:ring-[#818CF8]/50 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-mono uppercase tracking-widest text-[#94A3B8] mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className="w-full bg-[#161B29] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#818CF8]/50 focus:ring-1 focus:ring-[#818CF8]/50 transition-all"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-mono uppercase tracking-widest text-[#94A3B8] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full bg-[#161B29] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#818CF8]/50 focus:ring-1 focus:ring-[#818CF8]/50 transition-all resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  className="bg-white text-black px-10 py-4 rounded-full text-sm font-bold hover:bg-[#818CF8] hover:text-white transition-all duration-300 inline-flex items-center gap-3"
                >
                  Send Message
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactUsPage
