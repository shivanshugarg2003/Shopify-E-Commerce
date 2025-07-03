import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Cart from './Cart';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartSlice';
import wishlistReducer from '../redux/wishlistSlice';

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
        quantity: 1,
        image: 'https://example.com/tshirt.jpg',
      },
    ],
    wishlist: [],
  },
});

test('clicks Proceed to Checkout button', () => {
  render(
    <Provider store={customStore}>
      <Cart />
    </Provider>
  );

  const checkoutButton = screen.getByRole('button', { name: /proceed to checkout/i });
  expect(checkoutButton).toBeInTheDocument();
  expect(checkoutButton).toBeEnabled();

  // Check that product details are displayed
  expect(screen.getByText(/t-shirt/i)).toBeInTheDocument();
  expect(screen.getAllByText(/₹499/i)).toHaveLength(2);
  expect(screen.getByText(/quantity/i)).toBeInTheDocument();
  expect(
    screen.getByText((content, element) => {
      return (
        element.tagName.toLowerCase() === 'p' &&
        content.includes('Quantity:') &&
        content.includes('1')
      );
    })
  ).toBeInTheDocument();
  expect(screen.getByText(/total amount/i)).toBeInTheDocument();

  // Fire the click
  fireEvent.click(checkoutButton);

  // Placeholder for navigation/mock function if added later
});