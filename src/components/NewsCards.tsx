import { useContext, useEffect } from 'react';
import '../styles/newsCards.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from './Card';
import NewsContext from '../context/NewsContext';

function NewsCards() {
  const { cardsList, fetchAPI, handleNavbarClick,
    visibleCards, handleScroll } = useContext(NewsContext);

  useEffect(() => {
    fetchAPI('https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=100');
  }, []);

  useEffect(() => {
    handleScroll();
  }, [visibleCards]);

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={ (e) => handleNavbarClick(e) }>
              Mais Recentes
            </Nav.Link>
            <Nav.Link onClick={ (e) => handleNavbarClick(e) }>
              Releases
            </Nav.Link>
            <Nav.Link onClick={ (e) => handleNavbarClick(e) }>
              Notícias
            </Nav.Link>
            <Nav.Link onClick={ (e) => handleNavbarClick(e) }>
              Favoritos
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="cardslist-container">
        {cardsList.slice(0, visibleCards).map((card, index) => (
          <Card card={ card } key={ index } />
        ))}
      </div>
    </>
  );
}

export default NewsCards;
