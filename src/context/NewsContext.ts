import { createContext } from 'react';
import { ReportType } from '../types';

type NewsContextType = {
  highlightsList: ReportType[];
  fetchAPI: (URL: string) => void;
  handleClickCopy: (link: string) => void;
  isCopied: boolean;
  transformDate: (date: string) => string;
  transformImg: (imgJson: string) => string;
  isLoading: boolean;
  cardsList: ReportType[];
  handleNavbarClick: (e: any) => void;
  handleScroll: () => void;
  visibleCards: number;
  setCardsList: (card: ReportType[]) => void
  isFavoriteTab: boolean
};

const NewsContext = createContext({} as NewsContextType);

export default NewsContext;
