import '../styles/header.css';
import trybeLogo from '../assets/trybe.svg';

function Header() {
  return (
    <div className="header-container">
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
