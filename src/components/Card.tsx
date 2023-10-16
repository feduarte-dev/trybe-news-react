import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import emptyHeart from '../assets/empty-heart.svg';
import filledHeart from '../assets/filled-heart.svg';
import '../styles/newsCards.css';
import NewsContext from '../context/NewsContext';
import { CardPropsType, ReportType } from '../types';
import { readFavoriteNews, saveFavoriteNews } from '../services/favorites';

function Card({ card }: CardPropsType) {
  const { transformDate, setCardsList, isFavoriteTab } = useContext(NewsContext);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favoriteNews = readFavoriteNews();
    setIsFavorite(favoriteNews.some((report) => report.id === card.id));
  }, [card]);

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
    <div className="card-container">
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
            Detalhes
          </a>
        </Button>
        <label htmlFor={ card.titulo }>
          <input
            className="fav-input"
            type="checkbox"
            id={ card.titulo }
            onChange={ () => setFavoriteNews(card) }
            checked={ isFavorite }
          />
          <img
            className="fav-icon"
            src={ isFavorite ? filledHeart : emptyHeart }
            alt="favorite"
          />
        </label>
      </div>

      <hr />
    </div>
  );
}

export default Card;
