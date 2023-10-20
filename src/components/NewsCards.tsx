import { useContext, useEffect } from 'react';
import '../styles/newsCards.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from './Card';
import NewsContext from '../context/NewsContext';
import blocksIcon from '../assets/blocks-icon.svg';
import listIcon from '../assets/list-icon.svg';
import blocksIconDark from '../assets/blocks-icon-dark.svg';
import listIconDark from '../assets/list-icon-dark.svg';

function NewsCards() {
  const { cardsList, fetchAPI, handleNavbarClick,
    visibleCards, toggleList, isList, infiniteScroll,
    isDark, isFavoriteTab } = useContext(NewsContext);

  useEffect(() => {
    fetchAPI('https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=100');
  }, []);

  useEffect(() => {
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
          <label htmlFor="toggle-list" data-testid="toggleList">
            <input
              className="toogle-list-input"
              type="checkbox"
              id="toggle-list"
              onChange={ toggleList }
              checked={ isList }
            />
            <img
              className="toggle-list"
              src={ isDark ? blocksIcon : blocksIconDark }
              alt="togglelist"
            />
            <img
              className="toggle-list"
              src={ isDark ? listIcon : listIconDark }
              alt="togglelist"
            />
          </label>
        </div>
      </Navbar>

      {isFavoriteTab
      && JSON.parse(localStorage.getItem('Favorite News') || '[]').length === 0
      && (
        <p className="emptyFav">Você ainda não adicionou notícias aos seus favoritos!</p>
      )}

      <div className="cardslist-container">
        <InfiniteScroll
          dataLength={ cardsList.length }
          next={ infiniteScroll }
          hasMore
          loader={ false }
        >
          {cardsList.slice(0, visibleCards).map((card, index) => (
            <Card card={ card } key={ index } />
          ))}
        </InfiniteScroll>
      </div>

    </>
  );
}

export default NewsCards;
