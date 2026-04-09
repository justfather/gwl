import React, { useState, useRef, useCallback } from 'react';
import { ArrowLeft, Dices, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { soundEffects } from '../src/utils/audioUtils';

const DiceGame: React.FC = () => {
    const navigate = useNavigate();
    const [dice1, setDice1] = useState(1);
    const [dice2, setDice2] = useState(1);
    const [isRolling, setIsRolling] = useState(false);
    
    const triggerHaptic = (strength: number | number[]) => {
        if (navigator.vibrate) navigator.vibrate(strength);
    };

    const rollDice = useCallback(() => {
        if (isRolling) return;
        
        setIsRolling(true);
        triggerHaptic([50, 50, 50]);
        
        let i = 0;
        const interval = setInterval(() => {
            setDice1(Math.floor(Math.random() * 6) + 1);
            setDice2(Math.floor(Math.random() * 6) + 1);
            i++;
            
            if (i > 15) {
                clearInterval(interval);
                setIsRolling(false);
                triggerHaptic([100]);
                soundEffects.playWin();
            } else {
                soundEffects.playSpinTick();
            }
        }, 80);
    }, [isRolling]);

    // Dice Face component
    const DiceFace = ({ value }: { value: number }) => {
        const dots = [];
        for (let i = 0; i < value; i++) {
            dots.push(<div key={i} className="w-4 h-4 bg-slate-900 rounded-full shadow-inner" />);
        }
        
        // CSS Grid setup for different faces
        const getGridClass = (val: number) => {
            switch(val) {
                case 1: return "grid-cols-1 place-items-center";
                case 2: return "grid-cols-2 place-items-center rotate-45";
                case 3: return "grid-cols-3 place-items-center rotate-45";
                case 4: return "grid-cols-2 grid-rows-2 gap-2 place-items-center";
                case 5: return "grid-cols-3 grid-rows-3 gap-1 place-items-center [&>div:nth-child(1)]:col-start-1 [&>div:nth-child(1)]:row-start-1 [&>div:nth-child(2)]:col-start-3 [&>div:nth-child(2)]:row-start-1 [&>div:nth-child(3)]:col-start-2 [&>div:nth-child(3)]:row-start-2 [&>div:nth-child(4)]:col-start-1 [&>div:nth-child(4)]:row-start-3 [&>div:nth-child(5)]:col-start-3 [&>div:nth-child(5)]:row-start-3";
                case 6: return "grid-cols-2 grid-rows-3 gap-2 place-items-center";
                default: return "grid-cols-2 place-items-center";
            }
        };

        return (
            <div className={`w-28 h-28 bg-white rounded-3xl shadow-2xl p-4 grid ${getGridClass(value)} ${isRolling ? 'animate-bounce' : ''}`}>
                {dots}
            </div>
        );
    };

    return (
        <>
            <SEO title="ทอยเต๋าเสี่ยงทาย | เกมวงเหล้า" />
            <div className="h-full bg-[#0F172A] text-white flex flex-col font-sans overflow-hidden">
                <header className="p-4 flex items-center justify-between z-10">
                    <button onClick={() => navigate('/')} className="text-slate-400 hover:text-white transition flex items-center gap-2">
                        <ArrowLeft size={20} /> หน้าแรก
                    </button>
                    <h1 className="text-xl font-bold text-yellow-400">
                        ลูกเต๋า
                    </h1>
                    <div className="w-8" />
                </header>

                <main className="flex-1 flex flex-col items-center justify-center p-6 relative">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-black mb-2 flex items-center justify-center gap-2">
                            <Dices size={32} className="text-yellow-400" />
                            ไฮโลวงเหล้า
                        </h2>
                        <p className="text-slate-400">ใครแต้มน้อยสุด... ดื่ม!</p>
                    </div>

                    <div className="flex gap-6 mb-16 perspective-1000">
                        <div style={{ transform: isRolling ? 'rotateX(180deg) rotateY(180deg)' : 'none', transition: 'all 0.1s' }}>
                            <DiceFace value={dice1} />
                        </div>
                        <div style={{ transform: isRolling ? 'rotateX(-180deg) rotateY(180deg)' : 'none', transition: 'all 0.1s' }}>
                            <DiceFace value={dice2} />
                        </div>
                    </div>
                    
                    {!isRolling && (
                        <div className="text-4xl font-black text-white mb-12 animate-pop-in drop-shadow-xl text-center">
                            รวม <span className="text-yellow-400">{dice1 + dice2}</span> แต้ม
                        </div>
                    )}

                    <button 
                        onClick={rollDice}
                        disabled={isRolling}
                        className="w-full max-w-xs py-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl font-bold text-xl text-black shadow-lg shadow-yellow-900/40 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-3"
                    >
                        <RefreshCw size={24} className={isRolling ? 'animate-spin' : ''} />
                        {isRolling ? 'กำลังทอย...' : 'ทอยลูกเต๋า!'}
                    </button>
                </main>
            </div>
        </>
    );
};

export default DiceGame;
