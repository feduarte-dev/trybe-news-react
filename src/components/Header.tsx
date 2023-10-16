import '../styles/header.css';

function Header() {
  return (
    <>
      <img src="src/assets/trybe.svg" alt="trybe-logo" className="trybe-logo" />
      <div className="header-container">
        <h1 className="site-title">TRYBE NEWS</h1>
      </div>
    </>
  );
}

export default Header;
