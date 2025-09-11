interface Props {
  navigate: (page: 'home' | 'about') => void;
}

export const NavBar = ({ navigate }: Props): JSX.Element => (
  <nav className="flex gap-4 p-4 bg-gray-100">
    <button onClick={() => navigate('home')}>Home</button>
    <button onClick={() => navigate('about')}>About</button>
  </nav>
);
