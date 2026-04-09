import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { RefreshCw, X, Hand, Settings } from 'lucide-react';
import { GameMode, FUN_QUESTS, HOT_QUESTS, HARD_QUESTS, randomizeOptions } from '../data/gameData';
import { GameState, WheelOption } from '../types';
import SEO from '../components/SEO';

const WheelGame: React.FC = () => {
  // ... (state declarations remain same)

  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [result, setResult] = useState<WheelOption | null>(null);
  const [showHint, setShowHint] = useState(true);

  // Game Mode State
  const [showModeSelect, setShowModeSelect] = useState(false);
  const [currentMode, setCurrentMode] = useState<GameMode>('FUN');
  const [options, setOptions] = useState<WheelOption[]>([]);

  // Custom Mode State
  const [customInputs, setCustomInputs] = useState<string[]>(Array(8).fill(''));

  // Refs for physics loop
  const wheelRef = useRef<HTMLDivElement>(null);
  const needleRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(null);

  // Physics State
  const rotation = useRef(0);
  const velocity = useRef(0);
  const isDragging = useRef(false);
  const isSpinningRef = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0, time: 0 });
  const needleAngle = useRef(0);

  // ==========================================
  // [TUNING ZONE] - PIXEL PARTY PHYSICS
  // ==========================================
  const FRICTION = 0.994;
  const STOP_THRESHOLD = 0.05;
  const RESULT_DELAY = 500;

  // Dynamic Constants based on current options
  const PIN_COUNT = options.length > 0 ? options.length : 8;
  const SLICE_ANGLE = 360 / PIN_COUNT;

  // Init Options on Load
  useEffect(() => {
    handleModeSelect('FUN');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModeSelect = (mode: GameMode) => {
    setCurrentMode(mode);
    if (mode === 'CUSTOM') {
      setShowModeSelect(true);
      return;
    }

    let sourceData: string[] = [];
    switch (mode) {
      case 'FUN': sourceData = FUN_QUESTS; break;
      case 'HOT': sourceData = HOT_QUESTS; break;
      case 'HARD': sourceData = HARD_QUESTS; break;
    }

    // Randomize 8 items
    const newOptions = randomizeOptions(sourceData);
    setOptions(newOptions);
    setShowModeSelect(false);
    resetGame();
  };

  const saveCustomMode = () => {
    const validInputs = customInputs.filter(t => t.trim().length > 0);
    if (validInputs.length < 2) {
      alert('ใส่ข้อมูลอย่างน้อย 2 ช่องนะจ๊ะ');
      return;
    }
    const newOptions = randomizeOptions(validInputs);
    setOptions(newOptions);
    setCurrentMode('CUSTOM');
    setShowModeSelect(false);
    resetGame();
  };

  const updateCustomInput = (index: number, value: string) => {
    const newInputs = [...customInputs];
    newInputs[index] = value;
    setCustomInputs(newInputs);
  };

  const triggerHaptic = (strength: number | number[]) => {
    if (navigator.vibrate) navigator.vibrate(strength);
  };

  const finalizeResult = useCallback(() => {
    if (options.length === 0) return;

    const degreesPerSlice = 360 / options.length;
    const effectiveAngle = (360 - ((rotation.current % 360) + 360) % 360) % 360;
    const winningIndex = Math.round(effectiveAngle / degreesPerSlice) % options.length;
    const resultItem = options[winningIndex] || options[0];

    isSpinningRef.current = false;
    velocity.current = 0;

    setResult(resultItem);
    setGameState(GameState.RESULT);
    triggerHaptic([100, 50, 100]);
  }, [options]);

  const getAngle = (clientX: number, clientY: number, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI) + 90;
  };

  const animate = useCallback(() => {
    if (!wheelRef.current) return;

    if (!isDragging.current && Math.abs(velocity.current) > 0) {
      rotation.current += velocity.current;
      velocity.current *= FRICTION;

      wheelRef.current.style.transform = `rotate(${rotation.current}deg) translateZ(0)`;

      if (needleRef.current) {
        const tilt = Math.min(Math.max(velocity.current * 0.5, -15), 15);
        needleRef.current.style.transform = `translateX(-50%) rotate(${tilt}deg) translateZ(0)`;
      }

      if (Math.abs(velocity.current) < STOP_THRESHOLD) {
        velocity.current = 0;
        wheelRef.current.style.transform = `rotate(${rotation.current}deg) translateZ(0)`;
        if (needleRef.current) needleRef.current.style.transform = `translateX(-50%) rotate(0deg) translateZ(0)`;

        setTimeout(() => {
          finalizeResult();
        }, RESULT_DELAY);

        return;
      } else {
        requestRef.current = requestAnimationFrame(animate);
      }
    } else if (isDragging.current) {
      wheelRef.current.style.transform = `rotate(${rotation.current}deg) translateZ(0)`;
      if (needleRef.current) needleRef.current.style.transform = `translateX(-50%) rotate(0deg) translateZ(0)`;
    }
  }, [finalizeResult, FRICTION, STOP_THRESHOLD, RESULT_DELAY]);

  // Handle Drag Start
  const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (gameState === GameState.RESULT || showModeSelect) return;

    isDragging.current = true;
    setGameState(GameState.IDLE);
    setResult(null);
    setShowHint(false);
    isSpinningRef.current = false;
    velocity.current = 0;

    if (requestRef.current) cancelAnimationFrame(requestRef.current);

    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    lastMousePos.current = { x: clientX, y: clientY, time: Date.now() };
  };

  // Handle Drag Move
  const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging.current || !wheelRef.current) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const currentAngle = getAngle(clientX, clientY, wheelRef.current);
    const lastAngle = getAngle(lastMousePos.current.x, lastMousePos.current.y, wheelRef.current);

    let delta = currentAngle - lastAngle;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    rotation.current += delta;
    velocity.current = delta;

    lastMousePos.current = { x: clientX, y: clientY, time: Date.now() };
    wheelRef.current.style.transform = `rotate(${rotation.current}deg) translateZ(0)`;
  };

  // Handle Drag End
  const handleEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const THROW_MULTIPLIER = 2.5;

    if (Math.abs(velocity.current) > 0.5) {
      velocity.current = velocity.current * THROW_MULTIPLIER;
      const MAX_SPEED = 100;
      if (velocity.current > MAX_SPEED) velocity.current = MAX_SPEED;
      if (velocity.current < -MAX_SPEED) velocity.current = -MAX_SPEED;

      setGameState(GameState.SPINNING);
      isSpinningRef.current = true;
      triggerHaptic(50);
      requestRef.current = requestAnimationFrame(animate);
    } else {
      finalizeResult();
    }
  };

  const resetGame = () => {
    setResult(null);
    setGameState(GameState.IDLE);
    velocity.current = 0;
    needleAngle.current = 0;
    isSpinningRef.current = false;
    if (needleRef.current) needleRef.current.style.transform = 'translateX(-50%) rotate(0deg) translateZ(0)';
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [animate]);

  return (
    <div className="flex flex-col items-center justify-start pt-2 pb-4 h-full relative px-4 overflow-hidden select-none">
      <SEO title="วงล้อเสี่ยงทาย วงเหล้า - หมุนเลือกคำสั่ง" />

      {/* Top Bar: Mode Select */}
      <div className="absolute top-4 right-4 z-40">
        <button
          onClick={() => setShowModeSelect(true)}
          className="p-2 bg-slate-800/80 backdrop-blur rounded-full border border-slate-600 text-white shadow-lg hover:bg-slate-700 transition-all"
        >
          <Settings size={24} />
        </button>
      </div>

      {/* Header */}
      <div className="text-center mb-4 transition-opacity duration-300 relative z-10" style={{ opacity: gameState === GameState.RESULT ? 0 : 1 }}>
        <h2 className="text-2xl font-bold text-white mb-1">วงล้อเสี่ยงทาย</h2>
        <div className="flex items-center justify-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded border ${currentMode === 'FUN' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50' :
            currentMode === 'HOT' ? 'bg-pink-500/20 text-pink-500 border-pink-500/50' :
              currentMode === 'HARD' ? 'bg-red-600/20 text-red-500 border-red-500/50' :
                'bg-blue-500/20 text-blue-500 border-blue-500/50'
            }`}>
            {currentMode === 'FUN' ? '🤡 สายฮา' :
              currentMode === 'HOT' ? '🔥 18+' :
                currentMode === 'HARD' ? '💀 สายแข็ง' : '✏️ กำหนดเอง'}
          </span>
          <span className="text-slate-400 text-sm">
            {gameState === GameState.SPINNING ? 'กำลังลุ้น...' : 'ปัดแรงๆ'}
          </span>
        </div>
      </div>

      {/* Wheel Container */}
      <div className="relative w-full max-w-[600px] aspect-square mb-8 transition-all duration-300 mt-8">

        {/* Outer Ring */}
        <div className="absolute inset-[-4%] rounded-full bg-slate-800 shadow-2xl border border-slate-700"></div>

        {/* The Wheel */}
        <div
          ref={wheelRef}
          className="w-full h-full rounded-full relative cursor-grab active:cursor-grabbing touch-none"
          style={{ willChange: 'transform', backfaceVisibility: 'hidden', transform: 'rotate(0deg) translateZ(0)' }}
          onMouseDown={handleStart} onMouseMove={handleMove} onMouseUp={handleEnd} onMouseLeave={handleEnd}
          onTouchStart={handleStart} onTouchMove={handleMove} onTouchEnd={handleEnd}
        >
          <svg viewBox="0 0 320 320" className="w-full h-full transform rotate-0">
            {/* 1. Slices & Text */}
            {options.map((option, index) => {
              const centerAngle = index * SLICE_ANGLE;
              const startAngle = centerAngle - SLICE_ANGLE / 2;
              const endAngle = centerAngle + SLICE_ANGLE / 2;

              const x1 = 160 + 160 * Math.cos(Math.PI * (startAngle - 90) / 180);
              const y1 = 160 + 160 * Math.sin(Math.PI * (startAngle - 90) / 180);
              const x2 = 160 + 160 * Math.cos(Math.PI * (endAngle - 90) / 180);
              // Fix gap visual same logic
              const y2 = 160 + 160 * Math.sin(Math.PI * (endAngle - 90) / 180);

              const pathData = `M160,160 L${x1},${y1} A160,160 0 0,1 ${x2},${y2} Z`;

              const textRad = (centerAngle - 90) * (Math.PI / 180);
              const textX = 160 + 100 * Math.cos(textRad);
              const textY = 160 + 100 * Math.sin(textRad);

              // Font size adjustment for long text
              const fontSize = option.label.length > 15 ? 10 : option.label.length > 8 ? 12 : 14;

              return (
                <g key={option.id}>
                  <path d={pathData} fill={option.color} stroke="#1E293B" strokeWidth="2" />
                  <text
                    x={textX}
                    y={textY}
                    fill={option.textColor}
                    fontSize={fontSize}
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${centerAngle + 90}, ${textX}, ${textY})`}
                    style={{ fontFamily: 'Kanit, sans-serif' }}
                  >
                    {option.label.length > 12 && option.label.includes(' ')
                      ? (
                        <>
                          <tspan x={textX} dy="-0.5em">{option.label.split(' ')[0]}</tspan>
                          <tspan x={textX} dy="1.1em">{option.label.split(' ').slice(1).join(' ')}</tspan>
                        </>
                      )
                      : option.label.substring(0, 18) + (option.label.length > 18 ? '..' : '')}
                  </text>
                </g>
              );
            })}

            {/* 2. Center Hub */}
            <circle cx="160" cy="160" r="28" fill="#1E293B" stroke="#334155" strokeWidth="4" />
            <text x="160" y="160" dy="0.35em" textAnchor="middle" fontSize="20">🍺</text>
          </svg>
        </div>

        {/* The Needle */}
        <div
          className="absolute top-[-7%] left-1/2 w-[10%] h-[20%] pointer-events-none z-20 origin-[50%_15%]"
          ref={needleRef}
          style={{ willChange: 'transform', backfaceVisibility: 'hidden', transform: 'translateX(-50%) rotate(0deg) translateZ(0)' }}
        >
          <svg viewBox="0 0 40 80" className="w-full h-full drop-shadow-lg filter">
            <defs>
              <linearGradient id="needleGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="50%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
            </defs>
            <path d="M 20 75 L 35 15 L 20 0 L 5 15 Z" fill="url(#needleGrad)" stroke="#475569" strokeWidth="1" />
            <circle cx="20" cy="15" r="4" fill="#334155" />
          </svg>
        </div>

        {/* Hint */}
        {showHint && gameState === GameState.IDLE && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center animate-pulse border border-white/20">
              <Hand className="text-white/80 animate-bounce" size={32} />
            </div>
          </div>
        )}
      </div>

      {/* Mode Selection Modal */}
      {showModeSelect && createPortal(
        <div className="fixed inset-0 z-[10000] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-800 rounded-3xl border border-slate-700 p-6 shadow-2xl overflow-y-auto max-h-[90vh]">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">เลือกโหมดเกม</h2>
              <button onClick={() => setShowModeSelect(false)} className="text-slate-400 hover:text-white"><X /></button>
            </div>

            {/* Preset Modes */}
            <div className="grid grid-cols-1 gap-3 mb-8">
              <button onClick={() => handleModeSelect('FUN')} className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 hover:scale-[1.02] transition-transform text-left group">
                <div className="text-3xl group-hover:scale-110 transition-transform">🤡</div>
                <div>
                  <div className="font-bold text-yellow-400 text-lg">สายฮา (Funny)</div>
                  <div className="text-xs text-slate-400">เน้นขำๆ โดนแกล้งเบาๆ ไม่เจ็บตัว</div>
                </div>
              </button>

              <button onClick={() => handleModeSelect('HOT')} className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-pink-500/20 to-rose-500/20 border border-pink-500/50 hover:scale-[1.02] transition-transform text-left group">
                <div className="text-3xl group-hover:scale-110 transition-transform">🔥</div>
                <div>
                  <div className="font-bold text-pink-400 text-lg">สาย 18+ (Hot)</div>
                  <div className="text-xs text-slate-400">สกินชิพ ความลับ เรื่องบนเตียง</div>
                </div>
              </button>

              <button onClick={() => handleModeSelect('HARD')} className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-red-600/20 to-red-900/20 border border-red-500/50 hover:scale-[1.02] transition-transform text-left group">
                <div className="text-3xl group-hover:scale-110 transition-transform">💀</div>
                <div>
                  <div className="font-bold text-red-500 text-lg">สายแข็ง (Hardcore)</div>
                  <div className="text-xs text-slate-400">ดื่มหนัก เกมวัดดวง หมดแก้วรัวๆ</div>
                </div>
              </button>
            </div>

            {/* Custom Mode */}
            <div className="border-t border-slate-700 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Settings size={18} /> กำหนดเอง (Custom)
                </h3>
                <div className="text-xs text-slate-400">ใส่ได้สูงสุด 8 ข้อ</div>
              </div>

              <div className="space-y-2 mb-4">
                {customInputs.map((input, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-slate-500 w-6 text-center text-sm pt-2">{idx + 1}.</span>
                    <input
                      value={input}
                      onChange={(e) => updateCustomInput(idx, e.target.value)}
                      placeholder={`ตัวเลือกที่ ${idx + 1}`}
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={saveCustomMode}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95"
              >
                เริ่มเกมแบบกำหนดเอง
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}

      {/* Result Modal Overlay */}
      {result && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300" onClick={resetGame}></div>

          <div className="relative bg-slate-900 w-full max-w-xs p-6 rounded-[32px] text-center shadow-2xl border border-slate-700 animate-pop-in overflow-hidden z-10">
            <div className="absolute top-0 left-0 right-0 h-40 opacity-30" style={{ background: result.color, filter: 'blur(50px)' }}></div>
            <button onClick={resetGame} className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-slate-400 hover:text-white transition-colors cursor-pointer z-20">
              <X size={20} />
            </button>

            <div className="relative z-10 pt-4">
              <div className="text-7xl mb-4 animate-bounce drop-shadow-lg">
                {result.label.includes('หมดแก้ว') ? '🍺' :
                  result.label.includes('Truth') ? '😈' : '🎉'}
              </div>
              <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">ผลลัพธ์คือ</h3>
              <h2 className="text-3xl font-black mb-8 leading-tight drop-shadow-md" style={{ color: result.color === '#ffffff' ? '#60a5fa' : result.color }}>
                {result.label}
              </h2>
              <button onClick={resetGame} className="w-full py-4 bg-white text-slate-950 rounded-2xl font-bold text-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 shadow-xl active:scale-[0.96] cursor-pointer">
                <RefreshCw size={22} />
                เล่นต่อ
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default WheelGame;