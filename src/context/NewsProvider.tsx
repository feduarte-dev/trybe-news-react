import { useState } from 'react';
import ContextNews from './NewsContext';
import { ReportType } from '../types';
import useFetch from '../hooks/useFetch';

type NewsProviderProps = {
  children: React.ReactNode;
};

function NewsProvider({ children }: NewsProviderProps) {
  const [highlightsList, setHighlightsList] = useState<ReportType[]>([]);
  const [cardsList, setCardsList] = useState<ReportType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCards, setVisibleCards] = useState<number>(3);
  const [isFavoriteTab, setIsFavoriteTab] = useState(false);
  const { getApi } = useFetch();

  const fetchAPI = async (URL: string) => {
    const result = await getApi(URL);
    if (URL.includes('qtd=100')) {
      setHighlightsList(result.slice(0, 4));
      setCardsList(result.slice(4, -1));
    } else {
      setCardsList(result.slice(4, -1));
      setVisibleCards(3);
    }
    setIsLoading(false);
  };

  const transformImg = (imgJson: string) => {
    const jsonObj = JSON.parse(imgJson);
    const imgURL = jsonObj.image_intro;
    return `https://agenciadenoticias.ibge.gov.br/${imgURL}`;
  };

  function transformDate(date: string) {
    const splitDate = date.split('/');
    const formattedDate = `${splitDate[1]}/${splitDate[0]}/${splitDate[2]}`;
    const reportDate = new Date(formattedDate);
    const todayDate = new Date();
    const dateRange = Number(todayDate) - Number(reportDate);
    const result = Math.floor(dateRange / (1000 * 60 * 60 * 24));
    return result > 1 ? `${result} dias atrás` : `${result} dia atrás`;
  }

  const handleNavbarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    switch (target.innerText) {
      case 'Mais Recentes':
        fetchAPI('https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=100');
        setIsFavoriteTab(false);
        break;
      case 'Releases':
        fetchAPI(
          'http://servicodados.ibge.gov.br/api/v3/noticias/?tipo=release',
        );
        setIsFavoriteTab(false);
        break;
      case 'Notícias':
        fetchAPI(
          'http://servicodados.ibge.gov.br/api/v3/noticias/?tipo=noticia',
        );
        setIsFavoriteTab(false);
        break;
      case 'Favoritos':
        setCardsList(
          JSON.parse(localStorage.getItem('Favorite News') as string),
        );
        setIsFavoriteTab(true);
        break;
      default:
        break;
    }
  };

  const loadMoreCards = () => {
    const newVisibleCards = visibleCards + 3;
    setVisibleCards(newVisibleCards);
  };

  const handleScroll = () => {
    const infiniteScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        loadMoreCards();
      }
    };
    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('scroll', infiniteScroll);
    };
  };

  const context = {
    highlightsList,
    fetchAPI,
    transformDate,
    transformImg,
    isLoading,
    cardsList,
    handleNavbarClick,
    handleScroll,
    visibleCards,
    setCardsList,
    isFavoriteTab,
  };

  return (
    <ContextNews.Provider value={ context }>{children}</ContextNews.Provider>
  );
}

export default NewsProvider;
