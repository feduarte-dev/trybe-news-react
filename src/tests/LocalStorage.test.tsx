import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import * as fetchAPI from '../services/getApi';
import App from '../App';
import apiResultMock from './mocks/apiResultMock';
import setLocalStorage from './utils/setLocalStorage';
import NewsProvider from '../context/NewsProvider';

const favKey = 'Favorite News';
const themeKey = 'theme';

beforeEach(() => {
  window.localStorage.clear();
  setLocalStorage(favKey, []);
  setLocalStorage(themeKey, 'light');
  vi.spyOn(fetchAPI, 'getApi').mockResolvedValue(apiResultMock);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Local storage tests', () => {
  test('Expects that when clicking on the favorites button, a report will be added to the local storage', async () => {
    const user = userEvent.setup();
    render(
      <NewsProvider>
        <App />
      </NewsProvider>,
    );
    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i));

    await user.click(screen.getAllByTestId('favBtn')[0]);
    await user.click(screen.getAllByTestId('favBtn')[5]);
    await user.click(screen.getAllByTestId('favBtn')[6]);
    await user.click(screen.getByRole('button', { name: /favoritos/i }));

    const favorites = JSON.parse(window.localStorage.getItem(favKey) || '[]');
    expect(favorites).toHaveLength(3);
  });

  test('Expects that when you unfavorite an report, it will be removed from local storage', async () => {
    const user = userEvent.setup();
    setLocalStorage(favKey, apiResultMock);
    render(
      <NewsProvider>
        <App />
      </NewsProvider>,
    );
    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i));

    await user.click(screen.getByRole('button', { name: /favoritos/i }));
    await user.click(screen.getAllByTestId('favBtn')[0]);
    await user.click(screen.getAllByTestId('favBtn')[4]);
    await user.click(screen.getAllByTestId('favBtn')[7]);
    await user.click(screen.getAllByTestId('favBtn')[0]);

    const favorites = JSON.parse(window.localStorage.getItem(favKey) || '[]');

    expect(favorites).toHaveLength(13);
  });

  test('Expects that when changing themes and reloading the page, the theme remains', async () => {
    const user = userEvent.setup();
    render(
      <NewsProvider>
        <App />
      </NewsProvider>,
    );
    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i));

    await user.click(screen.getByRole('img', { name: /theme/i }));

    const themeValue = window.localStorage.getItem(themeKey);
    expect(themeValue).toBe('dark');
    window.location.reload();
    expect(screen.getByTestId('mainContainer')).toHaveClass('dark mainContainer');
  });
});
