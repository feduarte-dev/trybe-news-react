import { useState } from 'react';
import ContextNews from './NewsContext';
import { ReportType, NewsProviderProps } from '../types';
import { getApi } from '../services/getApi';
import { readInitialTheme, saveTheme } from '../services/localStorage';

function NewsProvider({ children }: NewsProviderProps) {
  const [highlightsList, setHighlightsList] = useState<ReportType[]>([]);
  const [cardsList, setCardsList] = useState<ReportType[]>([]);
  const [visibleCards, setVisibleCards] = useState<number>(4);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFavoriteTab, setIsFavoriteTab] = useState<boolean>(false);
  const [isList, setIsList] = useState<boolean>(false);
  const [isDark, setIsDark] = useState(readInitialTheme());

  // Função para buscar na API
  const fetchAPI = async (URL: string) => {
    const result = await getApi(URL);
    if (URL.includes('qtd=100')) {
      setHighlightsList(result.slice(0, 4));
      setCardsList(result.slice(4, -1));
    } else {
      setCardsList(result.slice(4, -1));
      setVisibleCards(4);
    }
    setIsLoading(false);
  };

  // Define a renderização das noticias em lista ou cards
  const toggleList = () => {
    setIsList((preIsList) => !preIsList);
  };

  // Reescreve o retorno das imagens da API para o formato adequado
  const transformImg = (imgJson: string) => {
    const jsonObj = JSON.parse(imgJson);
    const imgURL = jsonObj.image_intro;
    return `https://agenciadenoticias.ibge.gov.br/${imgURL}`;
  };

  // Reescreve o retorno das datas de publicação da API para o formato adequado
  function transformDate(date: string) {
    const splitDate = date.split('/');
    const formattedDate = `${splitDate[1]}/${splitDate[0]}/${splitDate[2]}`;
    const reportDate = new Date(formattedDate);
    const todayDate = new Date();
    const dateRange = Number(todayDate) - Number(reportDate);
    const result = Math.floor(dateRange / (1000 * 60 * 60 * 24));
    let resultString = '';
    if (result > 1) resultString = `${result} dias atrás`;
    else if (result === 0) resultString = 'Hoje';
    else resultString = `${result} dia atrás`;
    return resultString;
  }

  // Busca na API de acordo com o filtro clicado
  const handleNavbarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    switch (target.innerText) {
      case 'Mais Recentes':
        fetchAPI('https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=100');
        setIsFavoriteTab(false);
        break;
      case 'Releases':
        fetchAPI(
          'https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=release',
        );
        setIsFavoriteTab(false);
        break;
      case 'Notícias':
        fetchAPI(
          'https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=noticia',
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

  // Alterna entre os temas claro e escuro
  const changeTheme = () => {
    setIsDark((prevTheme) => {
      const newTheme = !prevTheme;
      saveTheme(newTheme);
      return newTheme;
    });
  };

  // Renderiza mais notícias de acordo com o scroll do mouse
  const infiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
    ) {
      const newVisibleCards = visibleCards + 4;
      setVisibleCards(newVisibleCards);
    }
  };

  window.addEventListener('scroll', infiniteScroll);

  const context = {
    highlightsList,
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
  };

  return (
    <ContextNews.Provider value={ context }>{children}</ContextNews.Provider>
  );
}

export default NewsProvider;
