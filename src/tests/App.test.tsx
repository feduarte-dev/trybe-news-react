import { render, screen, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
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

describe('Teste se a aplicação funciona', () => {
  test('Renderiza header', async () => {
    render(
      <NewsProvider>
        <App />
      </NewsProvider>,
    );
    expect(screen.getByText(/Carregando.../i)).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i));

    const title = screen.getByRole('heading', {
      name: /trybe news/i,
    });
    expect(title).toBeInTheDocument();
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

  // test('Renderiza navbar', async () => {
  //   const user = userEvent.setup();
  //   render(
  //     <NewsProvider>
  //       <App />
  //     </NewsProvider>,
  //   );
  //   await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i));
  //   await user.click(screen.getByRole('button', { name: /releases/i }));
  //   expect(fetchAPI.getApi).toBeCalledWith('http://servicodados.ibge.gov.br/api/v3/noticias/?tipo=release');
  //   await user.click(screen.getByRole('button', { name: /mais recentes/i }));
  //   expect(fetchAPI.getApi).toBeCalledWith('https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=100');
  //   await user.click(screen.getByRole('button', { name: /notícias/i }));
  //   expect(fetchAPI.getApi).toBeCalledWith('http://servicodados.ibge.gov.br/api/v3/noticias/?tipo=noticia');
  //   await user.click(screen.getByRole('button', { name: /favoritos/i }));
  // });

  // test('Renderiza navbar', async () => {
  //   const user = userEvent.setup();
  //   render(
  //     <NewsProvider>
  //       <App />
  //     </NewsProvider>,
  //   );
  //   await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i));
  //   await user.click(screen.getByRole('button', { name: /releases/i }));
  //   expect(getApi).lastCalledWith('http://servicodados.ibge.gov.br/api/v3/noticias/?tipo=release');
  // });

  test('Renderiza news cards', async () => {
    render(
      <NewsProvider>
        <App />
      </NewsProvider>,
    );
    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i));

    const news = screen.getAllByTestId('cardContainer');
    expect(news).toHaveLength(7);
  });

  test('Verifica funcionalidade de scroll infinito', async () => {
    render(
      <NewsProvider>
        <App />
      </NewsProvider>,
    );

    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i));

    console.log('ScrollY antes da rolagem:', window.scrollY);

    // Scroll into the reference point at the bottom of your content
    // const scrollReferencePoint = screen.getByTestId('scroll-reference-point');
    // scrollReferencePoint.scrollIntoView();

    // Wait for the scrolling to take effect
    await waitFor(() => {
      const news = screen.queryAllByTestId('cardContainer');
      console.log('Número de cardContainers:', news.length);
      expect(news).toHaveLength(7);
    });

    console.log('ScrollY após a rolagem:', window.scrollY);
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

  test('Verifica funcionalidade de scroll infinito', async () => {
    render(
      <NewsProvider>
        <App />
      </NewsProvider>,
    );

    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i));

    const scrollableContainer = screen.getByTestId('mainContainer'); // You can change this to the actual scrollable container
    scrollableContainer.scrollTo(0, 1000); // Scroll to the desired position

    await waitFor(() => {
      const news = screen.queryAllByTestId('cardContainer');
      expect(news).toHaveLength(8); // Or the expected count of news items.
    });
  });
});
