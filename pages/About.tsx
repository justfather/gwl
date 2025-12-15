import React from 'react';
import { ArrowLeft, Info, Github, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { APP_NAME } from '../constants';

const About: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <SEO title={`เกี่ยวกับเรา - ${APP_NAME}`} />
            <div className="min-h-screen bg-[#0F172A] text-white p-6 pb-24">
                <header className="mb-8">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center text-slate-400 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft size={20} className="mr-2" /> กลับหน้าแรก
                    </button>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                        เกี่ยวกับเรา
                    </h1>
                </header>

                <div className="space-y-8 max-w-2xl mx-auto">
                    {/* Main Info */}
                    <section className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 bg-slate-700 rounded-xl flex items-center justify-center text-3xl">
                                🍻
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">{APP_NAME}</h2>
                                <p className="text-slate-400 text-sm">เพื่อนคู่ใจในวงปาร์ตี้</p>
                            </div>
                        </div>
                        <p className="text-slate-300 leading-relaxed">
                            แอปพลิเคชันเว็บนี้สร้างขึ้นเพื่อให้ความบันเทิงในงานปาร์ตี้ หรือวงสังสรรค์
                            รวบรวมเกมคลาสสิคต่างๆ มาไว้ในที่เดียว เพื่อให้คุณและเพื่อนๆ สนุกกันได้โดยไม่ต้องเตรียมอุปกรณ์เยอะ
                        </p>
                    </section>

                    {/* Features */}
                    <section>
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Info size={18} className="text-blue-400" /> เป้าหมายของเรา
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                                <span className="text-2xl mb-2 block">🎮</span>
                                <h4 className="font-bold text-slate-200">รวมเกมสนุกๆ</h4>
                                <p className="text-xs text-slate-400 mt-1">ไม่ต้องโหลดแอปแยก หลายเกมในที่เดียว</p>
                            </div>
                            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                                <span className="text-2xl mb-2 block">📱</span>
                                <h4 className="font-bold text-slate-200">ใช้งานง่าย</h4>
                                <p className="text-xs text-slate-400 mt-1">ไม่ต้องติดตั้ง เล่นผ่านเว็บได้ทันที</p>
                            </div>
                        </div>
                    </section>

                    {/* Disclaimer */}
                    <section className="bg-red-500/10 p-6 rounded-2xl border border-red-500/20">
                        <h3 className="text-red-400 font-bold mb-2">⚠️ คำเตือน</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            ผู้พัฒนาสนับสนุนการดื่มอย่างรับผิดชอบ (Drink Responsibly)
                            เกมนี้จัดทำเพื่อความบันเทิงเท่านั้น ไม่สนับสนุนให้มีการบังคับดื่มจนเกิดอันตราย
                            หรือการดื่มแล้วขับขี่
                        </p>
                    </section>

                    {/* Contact / Links */}
                    <section className="pt-8 border-t border-slate-800 text-center">
                        <p className="text-slate-500 text-sm mb-4">หากพบปัญหาหรือมีข้อเสนอแนะ ติดต่อเราได้ที่</p>
                        <div className="flex justify-center gap-4">
                            <a href="https://github.com/cvimuk/gwl" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition">
                                <Github size={18} /> GitHub
                            </a>
                            <a href="mailto:contact@example.com" className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition">
                                <Mail size={18} /> Contact
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default About;
