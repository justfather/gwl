import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleDashed, Wine, Sparkles, ChevronRight } from 'lucide-react';
import { APP_NAME, TAGLINE } from '../constants';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO title="เกมวงเหล้า - วงล้อหมุน หมุนขวด เล่นฟรี" />
      <main className="p-6 flex flex-col items-center min-h-full pt-10">

        {/* Header Section */}
        <header className="space-y-3 mb-10 text-center relative w-full">
          {/* Decorative background blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-pink-600/20 blur-[50px] rounded-full -z-10" />

          <div className="flex justify-center mb-6 animate-float">
            <div className="w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl flex items-center justify-center shadow-xl shadow-black/30 border border-slate-700/50 rotate-3 transform transition-transform hover:rotate-6">
              <span className="text-5xl drop-shadow-md">🍻</span>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">
            {APP_NAME}
          </h1>
          <p className="text-slate-400 text-lg font-normal">{TAGLINE}</p>
        </header>

        {/* Main Actions */}
        <section className="w-full space-y-4 mb-8">
          <button
            onClick={() => navigate('/wheel')}
            className="w-full group relative overflow-hidden rounded-3xl bg-slate-800/80 p-1 transition-all active:scale-[0.98] border border-slate-700/50 hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/10"
          >
            <div className="relative z-10 bg-slate-900/50 backdrop-blur-sm rounded-[20px] p-5 flex items-center justify-between">
              <div className="flex items-center space-x-5">
                <div className="p-3.5 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl text-white shadow-lg shadow-pink-900/20">
                  <CircleDashed size={32} strokeWidth={2.5} />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white leading-tight">วงล้อเสี่ยงทาย</h3>
                  <p className="text-sm text-slate-400 font-light">หมุนลุ้นโชค สั่งเพื่อนดื่ม</p>
                </div>
              </div>
              <ChevronRight className="text-slate-600 group-hover:text-pink-400 transition-colors" />
            </div>
          </button>

          <button
            onClick={() => navigate('/bottle')}
            className="w-full group relative overflow-hidden rounded-3xl bg-slate-800/80 p-1 transition-all active:scale-[0.98] border border-slate-700/50 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10"
          >
            <div className="relative z-10 bg-slate-900/50 backdrop-blur-sm rounded-[20px] p-5 flex items-center justify-between">
              <div className="flex items-center space-x-5">
                <div className="p-3.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl text-white shadow-lg shadow-cyan-900/20">
                  <Wine size={32} strokeWidth={2.5} />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white leading-tight">หมุนขวด</h3>
                  <p className="text-sm text-slate-400 font-light">หาผู้โชคดีในวง</p>
                </div>
              </div>
              <ChevronRight className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
            </div>
          </button>
        </section>

        {/* Feature Grid (Coming Soon) */}
        <section className="w-full">
          <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-4 pl-2 flex items-center gap-2">
            <Sparkles size={12} className="text-yellow-500" />
            Coming Soon
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: '🎲', label: 'ทอยเต๋า' },
              { icon: '🎴', label: 'ไพ่คำสั่ง' },
              { icon: '💣', label: 'กู้ระเบิด' }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-800/40 border border-slate-700/30 opacity-60">
                <span className="text-2xl mb-2 grayscale opacity-70">{item.icon}</span>
                <span className="text-[10px] text-slate-400 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;