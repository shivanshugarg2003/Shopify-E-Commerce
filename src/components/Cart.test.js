import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cart from './Cart';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartSlice';
import wishlistReducer from '../redux/wishlistSlice';

if (typeof window !== 'undefined' && !window.getSelection) {
  window.getSelection = () => ({
    removeAllRanges: () => {},
  });
}

if (typeof document !== 'undefined' && !document.getSelection) {
  document.getSelection = () => ({
    removeAllRanges: () => {},
  });
}

const customStore = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  preloadedState: {
    cart: [
      {
        id: 1,
        name: 'T-shirt',
        price: 499,
        quantity: 2,
        image: 'https://example.com/tshirt.jpg',
      },
    ],
    wishlist: [],
  },
});

test('renders Cart with one item', () => {
  render(
    <Provider store={customStore}>
      <Cart />
    </Provider>
  );

  expect(screen.getByRole('heading', { name: /your cart/i })).toBeInTheDocument();
  expect(screen.getByText(/T-shirt/i)).toBeInTheDocument();
  expect(screen.getByText('Total: ₹998')).toBeInTheDocument();
  expect(screen.getByText(/Quantity:/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /proceed to checkout/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: '+' }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('button', { name: '−' }).length).toBeGreaterThan(0);
});

test('removes item from cart when Remove button is clicked', async () => {
  render(
    <Provider store={customStore}>
      <Cart />
    </Provider>
  );

  expect(screen.getByText(/T-shirt/i)).toBeInTheDocument();

  const removeBtn = screen.getByRole('button', { name: /remove/i });
  await userEvent.click(removeBtn, {
    // patch ownerDocument.getSelection for userEvent
    pointerEventsCheck: false,
  });

  expect(screen.queryByText(/T-shirt/i)).not.toBeInTheDocument();
  expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
});

test('renders empty cart message when cart is empty', () => {
  const emptyStore = configureStore({
    reducer: {
      cart: cartReducer,
      wishlist: wishlistReducer,
    },
    preloadedState: {
      cart: [],
      wishlist: [],
    },
  });

  render(
    <Provider store={emptyStore}>
      <Cart />
    </Provider>
  );

  expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
});