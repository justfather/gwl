import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Dices, ScrollText, Gamepad2, Info } from 'lucide-react';
import Layout from './components/Layout';
import Home from './pages/Home';
import WheelGame from './pages/WheelGame';
import BottleGame from './pages/BottleGame';
import Placeholder from './pages/Placeholder';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wheel" element={<WheelGame />} />
          <Route path="/bottle" element={<BottleGame />} />
          
          <Route 
            path="/dice" 
            element={
              <Placeholder 
                title="ลูกเต๋าเสี่ยงทาย" 
                icon={<Dices size={48} className="text-yellow-500" />} 
              />
            } 
          />
          <Route 
            path="/cards" 
            element={
              <Placeholder 
                title="ไพ่คำสั่ง" 
                icon={<ScrollText size={48} className="text-pink-500" />} 
              />
            } 
          />
          <Route 
            path="/games" 
            element={
              <Placeholder 
                title="รวมมินิเกม" 
                icon={<Gamepad2 size={48} className="text-cyan-500" />} 
              />
            } 
          />
           <Route 
            path="/about" 
            element={
              <Placeholder 
                title="เกี่ยวกับเรา" 
                icon={<Info size={48} className="text-blue-500" />} 
              />
            } 
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;