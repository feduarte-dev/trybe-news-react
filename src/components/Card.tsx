import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import emptyHeart from '../assets/empty-heart.svg';
import filledHeart from '../assets/filled-heart.svg';
import '../styles/newsCards.css';
import NewsContext from '../context/NewsContext';
import { CardPropsType, ReportType } from '../types';
import { readFavoriteNews, saveFavoriteNews } from '../services/localStorage';

function Card({ card, highlights }: CardPropsType) {
  const { transformDate, setCardsList, isFavoriteTab, isList } = useContext(NewsContext);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favoriteNews = readFavoriteNews();
    setIsFavorite(favoriteNews.some((report) => report.id === card.id));
  }, [card]);

  // Add and remove from favorites, if it is in the favorites tab, it updates instantly
  const setFavoriteNews = (favReport: ReportType) => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    const favoriteNews = readFavoriteNews();

    if (!isFavorite) {
      saveFavoriteNews([...favoriteNews, favReport]);
    } else {
      saveFavoriteNews(favoriteNews
        .filter((report: ReportType) => report.id !== favReport.id));
    }

    if (isFavoriteTab) {
      setCardsList(JSON
        .parse(localStorage.getItem('Favorite News') as string));
    }
  };

  return (
    <div
      className={ isList ? 'list card-container' : 'card-container' }
      data-testid="cardContainer"
    >
      {highlights && (
        <p className="highlights">Destaques</p>
      )}
      <h3>{card.titulo}</h3>
      <p>{card.introducao}</p>
      <span className="publi-date">
        {transformDate(card.data_publicacao)}
      </span>

      <div className="cards-btns">
        <Button variant="success">
          <a
            href={ card.link }
            target="_blank"
            className="details-btn"
            rel="noreferrer"
          >
            Leia mais
          </a>
        </Button>
        <label htmlFor={ card.titulo } data-testid="favLabel">
          <input
            className="fav-input"
            type="checkbox"
            id={ card.titulo }
            onChange={ () => setFavoriteNews(card) }
            checked={ isFavorite }
          />
          <img
            data-testid="favBtn"
            className="fav-icon"
            src={ isFavorite ? filledHeart : emptyHeart }
            alt="favorite"
          />
        </label>
      </div>

      {!highlights && (
        <hr />
      )}

    </div>
  );
}

export default Card;
