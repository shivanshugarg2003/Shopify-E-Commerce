// Polyfill for JSDOM to fix getSelection error
if (!window.getSelection) {
  window.getSelection = () => ({
    removeAllRanges: () => {},
  });
}

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Wishlist from './Wishlist';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartSlice';
import wishlistReducer from '../redux/wishlistSlice';

const renderWithStore = (wishlistItems = []) => {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      wishlist: wishlistReducer,
    },
    preloadedState: {
      cart: [],
      wishlist: wishlistItems,
    },
  });

  return render(
    <Provider store={store}>
      <Wishlist />
    </Provider>
  );
};

test('renders Wishlist with one item', () => {
  renderWithStore([
    {
      id: 2,
      name: 'Sneakers',
      price: 2999,
      image: 'https://example.com/sneakers.jpg',
    },
  ]);

  expect(screen.getByRole('heading', { name: /my wishlist/i })).toBeInTheDocument();
  expect(screen.getByText(/sneakers/i)).toBeInTheDocument();
  expect(screen.getByText(/₹2999/i)).toBeInTheDocument();
});

test('removes item from wishlist on button click', async () => {
  renderWithStore([
    {
      id: 2,
      name: 'Sneakers',
      price: 2999,
      image: 'https://example.com/sneakers.jpg',
    },
  ]);

  const removeButton = screen.getByRole('button', { name: /remove/i });
  expect(removeButton).toBeInTheDocument();

  fireEvent.click(removeButton);

  await waitFor(() => {
    expect(screen.queryByText(/sneakers/i)).not.toBeInTheDocument();
  });
});