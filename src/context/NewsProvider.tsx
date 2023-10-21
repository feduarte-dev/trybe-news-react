import { useState } from 'react';
import ContextNews from './NewsContext';
import { ReportType, NewsProviderProps } from '../types';
import { getApi } from '../services/getApi';
import { readInitialTheme, saveTheme } from '../services/localStorage';

function NewsProvider({ children }: NewsProviderProps) {
  const [originalCardsList, setOriginalCardsList] = useState<ReportType[]>([]);
  const [cardsList, setCardsList] = useState<ReportType[]>([]);
  const [visibleCards, setVisibleCards] = useState<number>(3);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFavoriteTab, setIsFavoriteTab] = useState<boolean>(false);
  const [isList, setIsList] = useState<boolean>(false);
  const [isDark, setIsDark] = useState(readInitialTheme());
  const [isVisible, setIsVisible] = useState(false);

  // Function to get API
  const fetchAPI = async (URL: string) => {
    const result = await getApi(URL);
    setOriginalCardsList(result);
    setCardsList(result.slice(4, -1));
    setIsLoading(false);
  };

  // Defines the rendering of news in list or cards
  const toggleList = () => {
    setIsList((preIsList) => !preIsList);
  };

  // Rewrites the images returned from the API to the proper format
  const transformImg = (imgJson: string) => {
    const jsonObj = JSON.parse(imgJson);
    const imgURL = jsonObj.image_intro;
    return `https://agenciadenoticias.ibge.gov.br/${imgURL}`;
  };

  // Rewrites the publish dates returned from the API the proper format
  function transformDate(date: string) {
    const splitDate = date.split('/');
    const formattedDate = `${splitDate[1]}/${splitDate[0]}/${splitDate[2]}`;
    const dateRange = Number(new Date()) - Number(new Date(formattedDate));
    const result = Math.floor(dateRange / (1000 * 60 * 60 * 24));
    let resultString = '';
    if (result > 1) resultString = `${result} dias atrás`;
    else if (result === 0) resultString = 'Hoje';
    else resultString = `${result} dia atrás`;
    return resultString;
  }

  // Filters the API return based on the button clicked
  const handleNavbarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;

    let filteredCards = [];

    switch (target.innerText) {
      case 'Mais Recentes':
        setCardsList(originalCardsList.slice(4, -1));
        setVisibleCards(3);
        setIsFavoriteTab(false);
        break;
      case 'Releases':
        filteredCards = originalCardsList
          .filter((card) => card.tipo === 'Release').slice(4, -1);
        setCardsList(filteredCards);
        setVisibleCards(3);
        setIsFavoriteTab(false);
        break;
      case 'Notícias':
        filteredCards = originalCardsList
          .filter((card) => card.tipo === 'Notícia').slice(4, -1);
        setCardsList(filteredCards);
        setVisibleCards(3);
        setIsFavoriteTab(false);
        break;
      case 'Favoritos':
        setCardsList(
          JSON.parse(localStorage.getItem('Favorite News') as string),
        );
        setVisibleCards(3);
        setIsFavoriteTab(true);
        break;
      default:
        break;
    }
  };

  // Toggle between light and dark themes
  const changeTheme = () => {
    setIsDark((prevTheme) => {
      const newTheme = !prevTheme;
      saveTheme(newTheme);
      return newTheme;
    });
  };

  // Observe the page height to render the scrollToTop button
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // When clicking the button the page returns to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Renders more news according to mouse scroll
  const infiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
    ) {
      const newVisibleCards = visibleCards + 3;
      setVisibleCards(newVisibleCards);
    }
  };

  window.addEventListener('scroll', infiniteScroll);
  window.addEventListener('scroll', handleScroll);

  const context = {
    originalCardsList,
    fetchAPI,
    transformDate,
    transformImg,
    isLoading,
    cardsList,
    handleNavbarClick,
    visibleCards,
    setCardsList,
    isFavoriteTab,
    toggleList,
    isList,
    infiniteScroll,
    changeTheme,
    isDark,
    scrollToTop,
    isVisible,
  };

  return (
    <ContextNews.Provider value={ context }>{children}</ContextNews.Provider>
  );
}

export default NewsProvider;
