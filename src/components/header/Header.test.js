// Mock getSelection for userEvent.type support in jsdom
if (typeof window !== 'undefined') {
  const mockSelection = () => ({
    removeAllRanges: () => {},
    addRange: () => {},
    getRangeAt: () => ({
      startOffset: 0,
      endOffset: 0,
      commonAncestorContainer: document.createElement('div')
    }),
    toString: () => '',
    rangeCount: 1,
    focusNode: document.createTextNode(''),
    anchorNode: document.createTextNode(''),
    focusOffset: 0,
    anchorOffset: 0,
    collapse: () => {},
    extend: () => {},
    deleteFromDocument: () => {},
    setBaseAndExtent: () => {} // ← added for userEvent compatibility
  });
  window.getSelection = mockSelection;
  document.getSelection = mockSelection;
}
import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../redux/cartSlice';
import wishlistReducer from '../../redux/wishlistSlice';

const renderWithProviders = (
  ui,
  {
    preloadedState = {
      cart: [],
      wishlist: [{ id: 1, name: 'Sample' }], // ensures wishlist counter is rendered
    },
    store = configureStore({
      reducer: { cart: cartReducer, wishlist: wishlistReducer },
      preloadedState,
    }),
  } = {}
) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
};

test('renders wishlist counter when wishlist has items', () => {
  renderWithProviders(<Header />);
  expect(screen.getByText('1')).toBeInTheDocument(); // covers line 24
});

test('renders cart counter when cart has items', () => {
  const preloadedState = {
    cart: [{ id: 1, name: 'T-Shirt', quantity: 2 }],
    wishlist: [],
  };
  renderWithProviders(<Header />, { preloadedState });
  expect(screen.getByText('2')).toBeInTheDocument(); // ensures cart quantity is shown
});
test('renders wishlist counter when wishlist is empty', () => {
  const preloadedState = {
    cart: [],
    wishlist: [],
  };
  const { container } = renderWithProviders(<Header />, { preloadedState });
  const counters = screen.getAllByText('0');
  const wishlistElement = container.querySelector('.wish-list .counter');
  expect(wishlistElement).toBeInTheDocument();
  expect(wishlistElement).toHaveTextContent('0');
});

test('renders both counters as 0 when cart and wishlist are empty', () => {
  const preloadedState = {
    cart: [],
    wishlist: [],
  };
  const { container } = renderWithProviders(<Header />, { preloadedState });
  const counters = screen.getAllByText('0');
  expect(counters).toHaveLength(2);

  const wishlistCounter = container.querySelector('.wish-list .counter');
  const cartCounter = container.querySelector('.cart .counter');
  expect(wishlistCounter).toBeInTheDocument();
  expect(cartCounter).toBeInTheDocument();
  expect(wishlistCounter).toHaveTextContent('0');
  expect(cartCounter).toHaveTextContent('0');
});

import userEvent from '@testing-library/user-event';

test('updates search query input', async () => {
  renderWithProviders(<Header />);
  const input = screen.getByPlaceholderText('Search Products...');
  await userEvent.type(input, 'shoes');
  expect(input).toHaveValue('shoes');
});