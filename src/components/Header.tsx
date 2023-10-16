import '../styles/header.css';

function Header() {
  return (
    <div className="header-container">
      <img src="src/assets/trybe.svg" alt="trybe-logo" className="trybe-logo" />
      <h1 className="site-title">TRYBE NEWS</h1>
    </div>
  );
}

export default Header;
