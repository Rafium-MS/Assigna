import { useState } from 'react';
import { NavBar } from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';

export default function App(): JSX.Element {
  const [page, setPage] = useState<'home' | 'about'>('home');

  return (
    <div>
      <NavBar navigate={setPage} />
      {page === 'home' && <Home />}
      {page === 'about' && <About />}
    </div>
  );
}
