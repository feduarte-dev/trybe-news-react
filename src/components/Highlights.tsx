import { useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/highlights.css';
import NewsContext from '../context/NewsContext';
import Card from './Card';

function Highlights() {
  const { transformImg, originalCardsList, isLoading } = useContext(NewsContext);

  const highlights = originalCardsList.slice(0, 4);

  if (isLoading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="carousel-container">
      <Carousel slide={ false } indicators={ false }>
        {highlights.length > 0
          && highlights.map((highlight, index) => (
            <Carousel.Item key={ highlight.id } interval={ 10000 }>
              <img
                className="highlight-img"
                src={ transformImg(highlight.imagens) }
                alt={ highlight.titulo }
              />
              <Card card={ highlight } key={ index } destaques />
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
}

export default Highlights;
