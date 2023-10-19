import { ReportType } from '../types';

const localStorageKey = 'Favorite News';

if (!JSON.parse(localStorage.getItem(localStorageKey) as string)) {
  localStorage.setItem(localStorageKey, JSON.stringify([]));
}

export const readFavoriteNews = (): ReportType[] => JSON.parse(
  localStorage.getItem(localStorageKey) as string,
);

export const saveFavoriteNews = (favoriteNews: ReportType[]) => localStorage
  .setItem(localStorageKey, JSON.stringify(favoriteNews));

export const getInitialTheme = () => {
  const storedTheme = localStorage.getItem('theme');
  return storedTheme === 'dark';
};
