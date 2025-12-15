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

        {/* Secondary Actions */}
        <div className="grid grid-cols-2 gap-3 w-full mb-8">
          <button
            onClick={() => navigate('/blog')}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-800/60 border border-slate-700 hover:bg-slate-700/60 transition-colors"
          >
            <div className="p-2 mb-2 bg-purple-500/20 text-purple-400 rounded-xl">
              <span className="text-xl">📚</span>
            </div>
            <span className="text-sm font-bold text-slate-200">บทความ</span>
            <span className="text-[10px] text-slate-500">เทคนิค & กติกา</span>
          </button>

          <button
            onClick={() => navigate('/about')}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-800/60 border border-slate-700 hover:bg-slate-700/60 transition-colors"
          >
            <div className="p-2 mb-2 bg-blue-500/20 text-blue-400 rounded-xl">
              <span className="text-xl">ℹ️</span>
            </div>
            <span className="text-sm font-bold text-slate-200">เกี่ยวกับเรา</span>
            <span className="text-[10px] text-slate-500">ผู้พัฒนา & ติดต่อ</span>
          </button>
        </div>

        {/* Feature Grid (Coming Soon) */}
        <section className="w-full mb-12">
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

        {/* SEO - Keyword Rich Content Section (Bottom) */}
        <section className="w-full pt-8 border-t border-slate-800/50 pb-12">
          <article className="prose prose-invert prose-sm max-w-none text-slate-400">
            <h2 className="text-xl font-bold text-slate-300 mb-4">เกมวงเหล้าออนไลน์ (Drinking Game Online) คืออะไร?</h2>
            <p className="mb-4 text-sm leading-relaxed">
              <strong>เกมวงเหล้า (Game Wong Lhao)</strong> คือเว็บแอปพลิเคชันที่รวบรวมมินิเกมสำหรับงานปาร์ตี้ สังสรรค์ หรือวงดื่มกับเพื่อนฝูง โดยที่คุณ<u>ไม่ต้องติดตั้งแอปพลิเคชัน</u>ลงในเครื่อง สามารถเปิดผ่านเว็บเบราว์เซอร์ได้ทันที รองรับทั้งมือถือและแท็บเล็ต
            </p>

            <h3 className="text-lg font-bold text-slate-300 mb-2">รวมเกมยอดนิยมในวงเหล้า</h3>
            <ul className="list-disc pl-5 space-y-2 mb-4 text-sm">
              <li>
                <strong>วงล้อเสี่ยงทาย (Wheel of Fate)</strong>: หรือเกมหมุนวงล้อ ที่ให้คุณใส่ชื่อเพื่อน หรือคำสั่งตลกๆ ลงไป แล้วหมุนเพื่อสุ่มหาผู้โชคดี เหมาะสำหรับการสุ่มคนดื่ม หรือสั่งให้เพื่อนทำตามคำสั่ง
              </li>
              <li>
                <strong>เกมหมุนขวด (Spin the Bottle)</strong>: เกมขวดหมุนสุดคลาสสิค แต่มาในรูปแบบออนไลน์ ไม่ต้องหาขวดจริงให้ยุ่งยาก ระบบหมุนสมจริงตามหลักฟิสิกส์
              </li>
            </ul>

            <h3 className="text-lg font-bold text-slate-300 mb-2">ทำไมต้องเล่นเกมวงเหล้ากับเรา?</h3>
            <p className="text-sm leading-relaxed">
              เราออกแบบมาเพื่อแก้ปัญหา "วงกร่อย" หรือ "คิดไม่ออกว่าจะเล่นอะไรดี" โดยรวบรวมเกมที่สร้างความสนุกและเสียงหัวเราะได้ง่ายๆ กติกาไม่ซับซ้อน และที่สำคัญคือ <strong>ฟรีตลอดชีพ</strong>
            </p>
          </article>
        </section>
      </main>
    </>
  );
};

export default Home;