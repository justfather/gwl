import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const routeNameMap: Record<string, string> = {
  'wheel': 'วงล้อเสี่ยงทาย',
  'bottle': 'หมุนขวด',
  'dice': 'ลูกเต๋าเสี่ยงทาย',
  'cards': 'ไพ่คำสั่ง',
  'games': 'รวมมินิเกม',
  'about': 'เกี่ยวกับเรา'
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Hide on homepage
  if (pathnames.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="w-full px-6 pt-5 pb-1 flex items-center text-[11px] font-medium z-20 animate-fade-in">
      <Link 
        to="/" 
        className="flex items-center text-slate-500 hover:text-pink-400 active:text-pink-500 transition-colors opacity-80 hover:opacity-100 group"
      >
        <Home size={12} className="mr-1 mb-[1px] group-active:scale-90 transition-transform" />
        หน้าแรก
      </Link>
      
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const name = routeNameMap[value] || value;
        const isLast = index === pathnames.length - 1;

        return (
          <React.Fragment key={to}>
            <ChevronRight size={10} className="mx-2 text-slate-700" />
            {isLast ? (
              <span className="text-pink-400 drop-shadow-[0_0_10px_rgba(244,114,182,0.3)] pointer-events-none tracking-wide">
                {name}
              </span>
            ) : (
               <Link 
                  to={to} 
                  className="text-slate-500 hover:text-pink-400 active:text-pink-500 transition-colors opacity-80 hover:opacity-100"
                >
                  {name}
               </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;