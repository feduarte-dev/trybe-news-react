import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import * as fetchAPI from '../services/getApi';
import App from '../App';
import localStorageMock from './mocks/localStorageMock';
import apiResultMock from './mocks/apiResultMock';
import setLocalStorage from './utils/setLocalStorage';
import NewsProvider from '../context/NewsProvider';

beforeEach(() => {
  window.localStorage.clear();
  setLocalStorage([]);
  vi.spyOn(fetchAPI, 'getApi').mockResolvedValue(apiResultMock);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Teste das funcionalidades de notícias preferidas', () => {
  test('Verifica funcionalidade de favoritos', async () => {
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

    const favorites = JSON.parse(window.localStorage.getItem('Favorite News') || '[]');
    expect(favorites).toHaveLength(3);
  });

  test('Verifica funcionalidade de desfavoritar', async () => {
    const user = userEvent.setup();
    setLocalStorage(localStorageMock);
    render(
      <NewsProvider>
        <App />
      </NewsProvider>,
    );
    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i));

    await user.click(screen.getByRole('button', { name: /favoritos/i }));
    await user.click(screen.getAllByTestId('favBtn')[0]);
    await user.click(screen.getAllByTestId('favBtn')[4]);

    const favorites = JSON.parse(window.localStorage.getItem('Favorite News') || '[]');

    expect(favorites).toHaveLength(1);
  });
});
