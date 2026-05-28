const FooterLogos = () => (
  <div className="relative z-10 px-8 pb-12 mt-auto max-w-[1200px] mx-auto w-full">
    <p className="text-[10px] font-semibold text-gray-500 mb-6 uppercase tracking-[0.2em]">
      Trusted by 1,000+ marketing companies worldwide
    </p>
    <div className="flex items-center gap-10 opacity-40 hover:opacity-60 transition-opacity">
      {['Google', 'Uber', 'Stanford', 'Google', 'Uber', 'Stanford'].map(
        (brand, i) => (
          <div key={i} className="flex items-center space-x-1.5 grayscale">
            {brand === 'Stanford' && (
              <div className="w-3 h-3 border-2 border-current"></div>
            )}
            <span className="text-xl font-black tracking-tighter">{brand}</span>
          </div>
        ),
      )}
    </div>
  </div>
)

export default FooterLogos
