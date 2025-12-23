import React, { useState, useEffect, useRef, useCallback } from 'react';
import SEO from '../components/SEO';
import { ArrowLeft, Hand, RefreshCw } from 'lucide-react';

const BOTTLES = [
  { id: 'singha', name: 'Singha', src: '/bottle-singha.png', color: '#fbbf24' },
  { id: 'chang', name: 'Chang', src: '/bottle-chang.png', color: '#22c55e' },
  { id: 'asahi', name: 'Asahi', src: '/bottle-asahi.png', color: '#94a3b8' },
];

const BottleGame: React.FC = () => {
  const [selectedBottle, setSelectedBottle] = useState(BOTTLES[0]);
  const [showHint, setShowHint] = useState(true);

  // Physics State
  const bottleRef = useRef<HTMLImageElement>(null);
  const requestRef = useRef<number>(null);
  const rotation = useRef(0);
  const velocity = useRef(0);
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0, time: 0 });

  // Physics Constants (Tuned for heavier bottle feel)
  const FRICTION = 0.99;
  const STOP_THRESHOLD = 0.05;

  const triggerHaptic = (strength: number | number[]) => {
    if (navigator.vibrate) navigator.vibrate(strength);
  };

  const getAngle = (clientX: number, clientY: number, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI) + 90;
  };

  const animate = useCallback(() => {
    if (!bottleRef.current) return;

    if (!isDragging.current && Math.abs(velocity.current) > 0) {
      rotation.current += velocity.current;
      velocity.current *= FRICTION;

      bottleRef.current.style.transform = `rotate(${rotation.current}deg)`;

      if (Math.abs(velocity.current) < STOP_THRESHOLD) {
        velocity.current = 0;
        triggerHaptic([50, 50]); // Stop haptic
      } else {
        requestRef.current = requestAnimationFrame(animate);
      }
    } else if (isDragging.current) {
      bottleRef.current.style.transform = `rotate(${rotation.current}deg)`;
    }
  }, [FRICTION]);

  // Handle Drag Start
  const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
    isDragging.current = true;
    setShowHint(false);
    velocity.current = 0;

    if (requestRef.current) cancelAnimationFrame(requestRef.current);

    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    lastMousePos.current = { x: clientX, y: clientY, time: Date.now() };
  };

  // Handle Drag Move
  const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging.current || !bottleRef.current) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const currentAngle = getAngle(clientX, clientY, bottleRef.current);
    const lastAngle = getAngle(lastMousePos.current.x, lastMousePos.current.y, bottleRef.current);

    let delta = currentAngle - lastAngle;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    rotation.current += delta;
    velocity.current = delta; // Simple velocity tracking

    lastMousePos.current = { x: clientX, y: clientY, time: Date.now() };
    bottleRef.current.style.transform = `rotate(${rotation.current}deg)`;
  };

  // Handle Drag End
  const handleEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    // Throw logic
    const THROW_MULTIPLIER = 2.0;
    const MAX_SPEED = 60; // Cap speed

    if (Math.abs(velocity.current) > 0.5) {
      velocity.current = velocity.current * THROW_MULTIPLIER;
      if (velocity.current > MAX_SPEED) velocity.current = MAX_SPEED;
      if (velocity.current < -MAX_SPEED) velocity.current = -MAX_SPEED;

      triggerHaptic(50);
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [animate]);

  return (
    <>
      <SEO
        title="หมุนขวด (Spin the Bottle) | เกมวงเหล้า"
        description="เกมหมุนขวดออนไลน์ เลือกคนในวงเหล้า เล่นง่ายไม่ต้องโหลดแอป"
        url={window.location.href}
      />

      <div className="h-full bg-[#0F172A] text-white flex flex-col font-sans overflow-hidden touch-none select-none">
        {/* Semantic Header */}
        <header className="p-4 flex items-center justify-between z-10">
          <a href="/" className="text-slate-400 hover:text-white transition flex items-center gap-2">
            <ArrowLeft size={20} /> หน้าแรก
          </a>
          <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            หมุนขวด
          </h1>
          <button onClick={() => window.location.reload()} className="text-slate-400 hover:text-white">
            <RefreshCw size={20} />
          </button>
        </header>

        {/* Semantic Main Content */}
        <main className="flex-1 flex flex-col items-center justify-start p-2 pt-4 relative w-full max-w-md mx-auto">

          {/* Bottle Selector - Smaller */}
          <div className="flex justify-center gap-3 z-20 mb-2">
            {BOTTLES.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBottle(b)}
                className={`w-9 h-9 rounded-full border-2 overflow-hidden transition-all transform ${selectedBottle.id === b.id ? 'border-white scale-110 shadow-lg shadow-white/20' : 'border-slate-600 opacity-50 grayscale hover:opacity-100 hover:grayscale-0'}`}
              >
                <img src={b.src} alt={b.name} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Instructions - Smaller */}
          <div className="text-center mb-2 z-10 pointer-events-none">
            <h2 className="text-xl font-bold text-white drop-shadow-lg tracking-tight">
              {selectedBottle.name}
            </h2>
            <p className="text-slate-400 text-xs">
              ปัดที่ขวดแรงๆ เพื่อหมุน! 🍾
            </p>
          </div>

          {/* Bottle Container - Much Larger */}
          <div
            className="flex-1 relative aspect-square flex items-center justify-center w-full"
            style={{ maxWidth: '95vw', maxHeight: '65vh' }}
          >

            {/* Floor Shadow/Glow Detail */}
            <div className={`absolute inset-0 rounded-full filter blur-3xl -z-10 scale-0.7 animate-pulse opacity-20`} style={{ backgroundColor: selectedBottle.color }}></div>

            {/* The Bottle */}
            <img
              ref={bottleRef}
              src={selectedBottle.src} // Use selected bottle
              alt="Beer Bottle"
              className="h-[95%] w-auto drop-shadow-2xl filter brightness-110 cursor-grab active:cursor-grabbing origin-center touch-none"
              style={{
                willChange: 'transform',
                transform: `rotate(${rotation.current}deg)`,
              }}
              onMouseDown={handleStart} onMouseMove={handleMove} onMouseUp={handleEnd} onMouseLeave={handleEnd}
              onTouchStart={handleStart} onTouchMove={handleMove} onTouchEnd={handleEnd}
              draggable={false}
            />

            {/* Hint */}
            {showHint && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center animate-pulse border border-white/20">
                  <Hand className="text-white/80 animate-bounce" size={40} />
                </div>
              </div>
            )}
          </div>

        </main>

        {/* Semantic Footer */}
        <footer className="p-4 text-center text-slate-600 text-[10px] z-10">
          <p>© 2025 เกมวงเหล้า - สร้างเพื่อความบันเทิงเท่านั้น</p>
        </footer>

        {/* Background Ambient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0F172A] to-[#0F172A] pointer-events-none -z-20"></div>
      </div>
    </>
  );
};

export default BottleGame;