import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';

interface PlaceholderProps {
  title: string;
  icon?: React.ReactNode;
}

const Placeholder: React.FC<PlaceholderProps> = ({ title, icon }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center space-y-6">
      <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center animate-pulse">
        {icon || <Construction size={48} className="text-slate-500" />}
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          COMING SOON
        </h3>
        <p className="text-slate-400">กำลังพัฒนาฟีเจอร์นี้อยู่ รอหน่อยนะวัยรุ่น</p>
      </div>

      <button
        onClick={() => navigate('/')}
        className="mt-8 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-2 transition-colors border border-slate-700"
      >
        <ArrowLeft size={18} />
        กลับหน้าแรก
      </button>
    </div>
  );
};

export default Placeholder;