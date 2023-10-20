import { createContext } from 'react';
import { ReportType } from '../types';

type NewsContextType = {
  originalCardsList: ReportType[];
  fetchAPI: (URL: string) => void;
  transformDate: (date: string) => string;
  transformImg: (imgJson: string) => string;
  isLoading: boolean;
  cardsList: ReportType[];
  handleNavbarClick: (e: any) => void;
  visibleCards: number;
  setCardsList: (card: ReportType[]) => void;
  isFavoriteTab: boolean;
  toggleList: () => void;
  isList: boolean;
  infiniteScroll: () => void
  changeTheme: () => void
  isDark: boolean

};

const NewsContext = createContext({} as NewsContextType);

export default NewsContext;
