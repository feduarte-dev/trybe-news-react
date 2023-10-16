import { useContext, useEffect } from 'react';
import '../styles/newsCards.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from './Card';
import NewsContext from '../context/NewsContext';
import blocksIcon from '../assets/blocks-icon.svg';
import listIcon from '../assets/list-icon.svg';

function NewsCards() {
  const { cardsList, fetchAPI, handleNavbarClick,
    visibleCards, handleScroll, toggleList, isList } = useContext(NewsContext);

  useEffect(() => {
    fetchAPI('https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=100');
  }, []);

  useEffect(() => {
    handleScroll();
  }, [visibleCards]);

  return (
    <>
      <Navbar className="bg-body-tertiary">
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
        <div className="toggle-list-div">
          <label htmlFor="toggle-list">
            <input
              className="toogle-list-input"
              type="checkbox"
              id="toggle-list"
              onChange={ toggleList }
              checked={ isList }
            />
            <img
              className="toggle-list"
              src={ blocksIcon }
              alt="togglelist"
            />
            <img
              className="toggle-list"
              src={ listIcon }
              alt="togglelist"
            />
          </label>
        </div>
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
