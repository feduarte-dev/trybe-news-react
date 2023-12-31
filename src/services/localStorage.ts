import { ReportType } from '../types';

const localStorageKey = 'Favorite News';

// If there is no local storage created, create one with an empty array
if (!JSON.parse(localStorage.getItem(localStorageKey) as string)) {
  localStorage.setItem(localStorageKey, JSON.stringify([]));
}

export const readFavoriteNews = (): ReportType[] => JSON.parse(
  localStorage.getItem(localStorageKey) as string,
);

export const saveFavoriteNews = (favoriteNews: ReportType[]) => localStorage
  .setItem(localStorageKey, JSON.stringify(favoriteNews));

export const readInitialTheme = () => {
  const storedTheme = localStorage.getItem('theme');
  return storedTheme === 'dark';
};
export const saveTheme = (theme: boolean) => {
  localStorage.setItem('theme', theme ? 'dark' : 'light');
};
