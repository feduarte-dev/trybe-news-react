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

describe('Component tests', () => {
  test('Expects the head to contain the title "Trybe News" and a button to change themes', async () => {
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
    expect(screen.getByTestId('mainContainer')).toHaveClass('dark mainContainer');
    await user.click(screen.getByRole('img', { name: /theme/i }));
    expect(screen.getByTestId('mainContainer')).toHaveClass('light mainContainer');
  });

  test('Expects the api to be called and return an object with news', async () => {
    render(
      <NewsProvider>
        <App />
      </NewsProvider>,
    );
    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i));

    expect(getApi).toBeCalledWith('https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=100');
    expect(getApi).toReturnWith(apiResultMock);
  });

  test('Expects the carousel to render and move.', async () => {
    const user = userEvent.setup();
    render(
      <NewsProvider>
        <App />
      </NewsProvider>,
    );
    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i));

    expect(getApi).toBeCalledWith('https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=100');
    const firstHighlight = screen.getByRole('heading', { name: /inflação fica em 0,26% em setembro/i });
    expect(firstHighlight).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /next/i }));
    const secondHighlight = screen.getByRole('heading', { name: /Preços da construção variam 0,02% em setembro/i });
    expect(secondHighlight).toBeInTheDocument();
  });

  test('Expects a new page to open when you click on the read more button and when you click on the favorites button the color of the image changes', async () => {
    const user = userEvent.setup();
    render(
      <NewsProvider>
        <App />
      </NewsProvider>,
    );
    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i));

    await user.click(screen.getAllByText('Leia mais')[0]);
    expect(window.location.href).not.toBe('about:blank');

    const favBtn = screen.getAllByTestId('favBtn')[0];
    let src = favBtn.getAttribute('src');
    expect(src).toBe('/src/assets/empty-heart.svg');
    await user.click(favBtn);
    src = favBtn.getAttribute('src');
    expect(src).toBe('/src/assets/filled-heart.svg');
  });

  test('Expects that when you click on one of the navbar buttons it will return new reports', async () => {
    const user = userEvent.setup();
    render(
      <NewsProvider>
        <App />
      </NewsProvider>,
    );
    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i));

    await user.click(screen.getByRole('button', { name: /releases/i }));
    expect(screen.getByText('IPCA foi de 0,26% em setembro')).toBeInTheDocument();
  });

  test('Expects that when the page loads the list renders seven news cards', async () => {
    render(
      <NewsProvider>
        <App />
      </NewsProvider>,
    );
    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i));

    const news = screen.getAllByTestId('cardContainer');
    expect(news).toHaveLength(7);
  });

  test('Expects the reports display changes to list and back to card', async () => {
    const user = userEvent.setup();
    render(
      <NewsProvider>
        <App />
      </NewsProvider>,
    );
    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i));
    await user.click(screen.getByTestId('toggleList'));
    expect(screen.getAllByTestId('cardContainer')[0]).toHaveClass('list card-container');
    await user.click(screen.getByTestId('toggleList'));
    expect(screen.getAllByTestId('cardContainer')[0]).toHaveClass('card-container');
  });
});
