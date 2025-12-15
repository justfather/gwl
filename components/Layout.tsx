import React from 'react';
import BottomNav from './BottomNav';
import Breadcrumbs from './Breadcrumbs';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-dvh w-full bg-[#020617] text-white flex flex-col items-center justify-center overflow-hidden relative">
      {/* Global Background Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[60%] bg-purple-900/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[50%] bg-pink-900/20 rounded-full blur-[80px] pointer-events-none" />
      </div>

      <div className="w-full max-w-2xl h-full flex flex-col relative z-10 shadow-2xl shadow-black/50 bg-slate-900/30 backdrop-blur-[2px]">
        <main className="flex-1 overflow-y-auto no-scrollbar pb-[90px] overscroll-none flex flex-col">
          <Breadcrumbs />
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
};

export default Layout;