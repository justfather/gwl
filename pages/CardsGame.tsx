import React, { useState, useCallback } from 'react';
import { ArrowLeft, ScrollText, RefreshCw, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { soundEffects } from '../src/utils/audioUtils';

const QUESTIONS = [
    { type: 'hot', text: 'เล่าประวัติแฟนคนแรกของคุณ หรือดื่ม 1 ช็อต', color: 'bg-rose-600' },
    { type: 'fun', text: 'ทำหน้าตาตลกที่สุดให้ทุกคนดู ไม่งั้นดื่มครึ่งแก้ว', color: 'bg-blue-600' },
    { type: 'hard', text: 'ดื่มหมดแก้วทันที ไม่มีข้อแม้!', color: 'bg-slate-900' },
    { type: 'fun', text: 'คนที่เกิดเดือนนี้ ต้องดื่ม 1 ช็อต', color: 'bg-emerald-600' },
    { type: 'hot', text: 'ชี้คนที่คุณคิดว่าหน้าตาดีที่สุดในวง คนนั้นต้องดื่ม', color: 'bg-purple-600' },
    { type: 'hard', text: 'เป่ายิงฉุบกับคนขวามือ ใครแพ้ดื่ม', color: 'bg-orange-600' },
    { type: 'fun', text: 'ห้ามพูดคำหยาบ 5 นาที ใครเผลอพูด ดื่ม 1 ช็อต', color: 'bg-cyan-600' },
    { type: 'hot', text: 'ให้คนตรงข้ามถามคำถาม 1 ข้อ คุณต้องตอบความจริง หรือดื่ม', color: 'bg-pink-600' }
];

const CardsGame: React.FC = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [isFlipped, setIsFlipped] = useState(false);
    const [deck, setDeck] = useState([...QUESTIONS].sort(() => Math.random() - 0.5));
    
    const triggerHaptic = (strength: number | number[]) => {
        if (navigator.vibrate) navigator.vibrate(strength);
    };

    const drawCard = useCallback(() => {
        soundEffects.init();
        if (!isFlipped && currentIndex >= 0) {
            setIsFlipped(true);
            soundEffects.playFlip();
            triggerHaptic(50);
        } else {
            setIsFlipped(false);
            soundEffects.playClick();
            setTimeout(() => {
                const nextIndex = currentIndex + 1;
                if (nextIndex >= deck.length) {
                    setDeck([...QUESTIONS].sort(() => Math.random() - 0.5));
                    setCurrentIndex(0);
                } else {
                    setCurrentIndex(nextIndex);
                }
                triggerHaptic([50, 100]);
            }, 300); // Wait for flip back animation
        }
    }, [currentIndex, deck.length, isFlipped]);

    const currentCard = currentIndex >= 0 ? deck[currentIndex] : null;

    return (
        <>
            <SEO title="ไพ่คำสั่งเสี่ยงทาย | เกมวงเหล้า" />
            <div className="h-full bg-[#0F172A] text-white flex flex-col font-sans overflow-hidden">
                <header className="p-4 flex items-center justify-between z-10">
                    <button onClick={() => navigate('/')} className="text-slate-400 hover:text-white transition flex items-center gap-2">
                        <ArrowLeft size={20} /> หน้าแรก
                    </button>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">
                        ไพ่คำสั่ง
                    </h1>
                    <div className="w-8" />
                </header>

                <main className="flex-1 flex flex-col items-center justify-center p-6 relative">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-black mb-2 flex items-center justify-center gap-2">
                            <Layers size={32} className="text-pink-500" />
                            จั่วไพ่วัดใจ
                        </h2>
                        <p className="text-slate-400">จั่วไพ่แล้วรอลุ้นคำสั่งสุดพีก!</p>
                    </div>

                    <div 
                        className="relative w-64 h-96 perspective-1000 cursor-pointer mb-12"
                        onClick={drawCard}
                    >
                        <div className={`w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                            {/* Card Back */}
                            <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border-4 border-slate-700 shadow-2xl flex items-center justify-center">
                                <div className="w-48 h-80 border-2 border-dashed border-slate-600 rounded-2xl flex flex-col items-center justify-center opacity-50">
                                    <ScrollText size={64} className="text-slate-500 mb-4" />
                                    <span className="font-bold text-slate-500 text-xl tracking-widest uppercase">Tap to Draw</span>
                                </div>
                            </div>

                            {/* Card Front */}
                            <div className={`absolute inset-0 backface-hidden rotate-y-180 ${currentCard?.color || 'bg-slate-800'} rounded-3xl border-4 border-white/20 shadow-2xl flex flex-col items-center justify-center p-6 text-center shadow-[0_0_50px_rgba(0,0,0,0.5)]`}>
                                <div className="absolute top-4 left-4 text-white/50 text-4xl">❝</div>
                                <h3 className="text-2xl font-bold text-white drop-shadow-md leading-relaxed z-10">
                                    {currentCard?.text || 'แตะอีกครั้งเพื่อจั่ว'}
                                </h3>
                                <div className="absolute bottom-4 right-4 text-white/50 text-4xl">❞</div>
                            </div>
                        </div>
                    </div>

                    <p className="text-slate-500 text-sm animate-pulse">
                        {isFlipped ? 'แตะไพ่อีกครั้งเพื่อเก็บ' : (currentIndex === -1 ? 'แตะที่กองไพ่เพื่อเริ่มเล่น' : 'แตะที่กองไพ่เพื่อเปิด')}
                    </p>
                </main>
            </div>
        </>
    );
};

export default CardsGame;
