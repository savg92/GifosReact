import Home from './pages/Home';
import Favorites from './pages/Favorites';
import MisGIF from './pages/MyGIF';
import NewGIF from './pages/NewGIF';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Home className="dark:bg-gray-900" />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/misgif" element={<MisGIF />} />
        <Route path="/newgif" element={<NewGIF />} />
      </Routes>
    </>
  );
}