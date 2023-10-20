import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from '../App';
import NewsProvider from '../context/NewsProvider';
import apiResultMock from './mocks/apiResultMock';
import * as fetchAPI from '../services/getApi';
import { getApi } from '../services/getApi';

beforeEach(() => {
  vi.spyOn(fetchAPI, 'getApi').mockResolvedValue(apiResultMock);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Teste dos componentes', () => {
  test('Renderiza header', async () => {
    const user = userEvent.setup();
    render(
      <NewsProvider>
        <App />
      </NewsProvider>,
    );
    expect(screen.getByText(/Carregando.../i)).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i));

    expect(screen.getByRole('heading', { name: /trybe news/i })).toBeInTheDocument();
    await user.click(screen.getByRole('img', { name: /theme/i }));
  });

  test('Renderiza highlights', async () => {
    render(
      <NewsProvider>
        <App />
      </NewsProvider>,
    );
    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i));

    const mainNews = screen.getByRole('heading', {
      name: /inflação fica em 0,26% em setembro, influenciada pelo aumento da gasolina/i,
    });
    expect(mainNews).toBeInTheDocument();
    expect(getApi).toBeCalledWith('https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=100');
  });

  test('Renderiza navbar', async () => {
    const user = userEvent.setup();
    render(
      <NewsProvider>
        <App />
      </NewsProvider>,
    );
    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i));
    await user.click(screen.getByRole('button', { name: /releases/i }));
    await user.click(screen.getByRole('button', { name: /mais recentes/i }));
    await user.click(screen.getByRole('button', { name: /notícias/i }));
    await user.click(screen.getByRole('button', { name: /favoritos/i }));
  });

  test('Renderiza news cards', async () => {
    render(
      <NewsProvider>
        <App />
      </NewsProvider>,
    );
    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i));

    const news = screen.getAllByTestId('cardContainer');
    expect(news).toHaveLength(8);
  });

  test('Verifica funcionalidade de trocar de lista para cards', async () => {
    const user = userEvent.setup();
    render(
      <NewsProvider>
        <App />
      </NewsProvider>,
    );
    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i));
    await user.click(screen.getByTestId('toggleList'));
  });
});
