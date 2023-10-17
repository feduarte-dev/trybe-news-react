import '../styles/header.css';
import { useContext } from 'react';
import trybeLogo from '../assets/trybe.svg';
import NewsContext from '../context/NewsContext';
import bulbOn from '../assets/bulb-on.svg';
import bulbOff from '../assets/bulb-off.svg';

function Header() {
  const { changeTheme, isDark } = useContext(NewsContext);

  return (
    <div className="header-container">

      <label htmlFor="theme-input">
        <input
          type="checkbox"
          id="theme-input"
          onChange={ changeTheme }
          checked={ !isDark }
        />
        <img
          src={ isDark ? bulbOn : bulbOff }
          alt="theme"
          className="theme"
        />
      </label>

      <img
        src={ trybeLogo }
        alt="trybe-logo"
        className="trybe-logo"
      />
      <h1 className="site-title">TRYBE NEWS</h1>
    </div>
  );
}

export default Header;
