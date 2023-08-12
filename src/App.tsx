import Home from './pages/Home';
import Favorites from './pages/Favorites';
import MisGIF from './pages/MyGIF';
import NewGIF from './pages/NewGIF';
import { Routes, Route } from 'react-router-dom';

const App: React.FC = () : JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/misgif" element={<MisGIF />} />
        <Route path="/newgif" element={<NewGIF />} />
      </Routes>
    </>
  );
}

export default App;