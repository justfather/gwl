import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dices, ScrollText, Gamepad2, Info } from 'lucide-react';
import Layout from './components/Layout';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Home from './pages/Home';
import WheelGame from './pages/WheelGame';
import BottleGame from './pages/BottleGame';
import DiceGame from './pages/DiceGame';
import CardsGame from './pages/CardsGame';
import Placeholder from './pages/Placeholder';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wheel" element={<WheelGame />} />
          <Route path="/bottle" element={<BottleGame />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />

          <Route path="/dice" element={<DiceGame />} />
          <Route path="/cards" element={<CardsGame />} />
          <Route
            path="/games"
            element={
              <Placeholder
                title="รวมมินิเกม"
                icon={<Gamepad2 size={48} className="text-cyan-500" />}
              />
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;