const AuroraEffect = () => (
  <div className="absolute top-0 right-0 w-2/3 h-full overflow-hidden z-0 pointer-events-none">
    <div className="absolute top-[-20%] right-[-10%] w-[120%] h-[140%] rotate-[15deg] animate-aurora-flow">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 via-purple-500/40 to-orange-400/40 blur-[100px]"></div>
      <div className="absolute inset-0 aurora-texture opacity-40"></div>
      <div className="absolute top-1/4 left-0 w-full h-[300px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent blur-[60px] -rotate-12"></div>
      <div className="absolute top-1/2 left-0 w-full h-[200px] bg-gradient-to-r from-transparent via-orange-400/20 to-transparent blur-[80px] rotate-12"></div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#030303]"></div>
  </div>
)

export default AuroraEffect
