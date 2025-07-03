import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

const renderApp = () =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

test('renders App component and essential links', async () => {
  renderApp();

  const links = await screen.findAllByRole('link');
  const linkTexts = links.map(link => link.textContent.toLowerCase().trim());
  expect(linkTexts).toEqual(expect.arrayContaining(['home', 'products']));
});

test('navigational links exist and point to expected routes', async () => {
  renderApp();

  const links = await screen.findAllByRole('link');
  const hrefs = links.map(link => link.getAttribute('href'));
  expect(hrefs).toEqual(expect.arrayContaining(['/', '/products']));
});