import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dices, Wine, CircleDashed, Gamepad2, ScrollText } from 'lucide-react';
import { NavItem } from '../types';

const NAV_ITEMS: NavItem[] = [
  { label: 'วงล้อ', path: '/wheel', icon: CircleDashed },
  { label: 'ขวด', path: '/bottle', icon: Wine },
  { label: 'ลูกเต๋า', path: '/dice', icon: Dices },
  { label: 'ไพ่', path: '/cards', icon: ScrollText },
  { label: 'เกม', path: '/games', icon: Gamepad2 },
];

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="absolute bottom-0 left-0 right-0 glass-nav pb-[max(env(safe-area-inset-bottom),16px)] pt-3 px-4 z-50 rounded-t-3xl">
      <div className="flex justify-between items-end">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center w-14 transition-all duration-300 relative group ${
                isActive ? '-translate-y-2' : ''
              }`}
            >
              {/* Glow effect for active item */}
              {isActive && (
                <div className="absolute inset-0 bg-pink-500/20 blur-xl rounded-full" />
              )}
              
              <div className={`p-2.5 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-pink-500/40 text-white' 
                  : 'text-slate-400 group-hover:text-slate-200'
              }`}>
                <Icon size={isActive ? 24 : 24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              
              <span className={`text-[10px] mt-1 font-medium transition-all duration-300 ${
                isActive ? 'text-white translate-y-0 opacity-100' : 'text-slate-500 translate-y-1 opacity-0'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;