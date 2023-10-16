import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import shareIcon from '../assets/share-icon.svg';
import emptyHeart from '../assets/empty-heart.png';
import filledHeart from '../assets/filled-heart.png';
import '../styles/newsCards.css';
import NewsContext from '../context/NewsContext';
import { CardPropsType, ReportType } from '../types';
import { readFavoriteNews, saveFavoriteNews } from '../services/favorites';

function Card({ card }: CardPropsType) {
  const { handleClickCopy, isCopied, transformDate,
    setCardsList, isFavoriteTab } = useContext(NewsContext);
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
    <div>
      <div className="card-container">
        <h3>{card.titulo}</h3>
        <p>{card.introducao}</p>
        <span className="publi-date">
          {transformDate(card.data_publicacao)}
        </span>
        <div className="cards-btns">
          {isCopied && <span className="copied">Link copiado!</span>}
          <button
            className="fav-share"
            onClick={ () => handleClickCopy(card.link) }
          >
            <img src={ shareIcon } alt="" />
          </button>

          <label htmlFor={ card.titulo }>
            <input
              type="checkbox"
              name="favoriteTrack"
              id={ card.titulo }
              onChange={ () => setFavoriteNews(card) }
              checked={ isFavorite }
            />
            <img src={ isFavorite ? filledHeart : emptyHeart } alt="favorite" />
          </label>

          <Button variant="success">
            <a
              href={ card.link }
              target="_blank"
              rel="noopener noreferrer"
              className="details-btn"
            >
              Detalhes
            </a>

          </Button>
        </div>
      </div>
    </div>
  );
}

export default Card;
