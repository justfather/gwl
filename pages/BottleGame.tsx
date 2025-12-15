import React, { useState } from 'react';
import SEO from '../components/SEO';
import { ArrowLeft } from 'lucide-react';

const BottleGame: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    // Spin at least 4 rounds (1440 deg) + random angle (0-360)
    // Add to current rotation to ensure continuous spinning direction
    const spinAmount = 1440 + Math.random() * 360;
    const newRotation = rotation + spinAmount;

    setRotation(newRotation);

    // Reset spinning state after animation ends (5s matched with CSS)
    setTimeout(() => {
      setIsSpinning(false);
    }, 5000);
  };

  return (
    <>
      <SEO
        title="หมุนขวด (Spin the Bottle)"
        description="เกมหมุนขวดออนไลน์ เลือกคนในวงเหล้า เล่นง่ายไม่ต้องโหลดแอป"
        url={window.location.href}
      />

      <div className="min-h-screen bg-[#0F172A] text-white flex flex-col font-sans">
        {/* Semantic Header */}
        <header className="p-4 flex items-center justify-between z-10">
          <a href="/" className="text-slate-400 hover:text-white transition flex items-center gap-2">
            <ArrowLeft size={20} /> หน้าแรก
          </a>
          <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            หมุนขวด
          </h1>
          <div className="w-8"></div> {/* Spacer */}
        </header>

        {/* Semantic Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden">

          {/* Instructions */}
          <div className="text-center mb-12 z-10">
            <h2 className="text-3xl font-black mb-2 text-white drop-shadow-lg tracking-tight">
              เสี่ยงดวงเลือกคน!
            </h2>
            <p className="text-slate-400">
              นั่งล้อมวง แล้วกดปุ่มหมุนขวดเพื่อเลือกผู้โชคดี 🍾
            </p>
          </div>

          {/* Bottle Container */}
          <div className="relative w-full max-w-xs aspect-square flex items-center justify-center mb-12">

            {/* The Bottle */}
            <img
              src="/bottle.png"
              alt="Beer Bottle"
              className="w-48 h-auto drop-shadow-2xl filter brightness-110"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? 'transform 5s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
                // cubic-bezier(0.25, 1, 0.5, 1) gives a nice soft landing
              }}
            />

            {/* Floor Shadow/Glow Detail */}
            <div className="absolute inset-0 bg-white/5 rounded-full filter blur-3xl -z-10 scale-0.8 animate-pulse"></div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className={`
              px-12 py-4 rounded-full font-black text-xl shadow-xl transition-all relative z-20 group
              ${isSpinning
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed scale-95'
                : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 active:scale-95 text-white shadow-green-500/20'}
            `}
          >
            {isSpinning ? 'กำลังหมุน...' : 'หมุนเลย! 🎲'}

            {!isSpinning && (
              <span className="absolute inset-0 rounded-full ring-2 ring-white/30 animate-ping opacity-30"></span>
            )}
          </button>

        </main>

        {/* Semantic Footer */}
        <footer className="p-4 text-center text-slate-600 text-xs z-10">
          <p>© 2025 เกมวงเหล้า - สร้างเพื่อความบันเทิงเท่านั้น</p>
        </footer>

        {/* Background Ambient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-[#0F172A] to-[#0F172A] pointer-events-none"></div>
      </div>
    </>
  );
};

export default BottleGame;