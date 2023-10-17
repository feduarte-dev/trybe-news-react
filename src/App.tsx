import { useContext } from 'react';
import './App.css';
import Landpage from './pages/Landpage';
import NewsContext from './context/NewsContext';

function App() {
  const { isDark } = useContext(NewsContext);
  return (
    <div
      data-testid="mainContainer"
      className={ isDark ? 'dark mainContainer' : 'light mainContainer' }
    >
      <Landpage />
    </div>
  );
}

export default App;
