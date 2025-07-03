import React from 'react';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import Cart from './Cart';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartSlice';
import wishlistReducer from '../redux/wishlistSlice';

afterEach(cleanup);

const customStore = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  preloadedState: {
    cart: [],
    wishlist: [],
  },
});

test('increments and decrements item quantity', async () => {
  render(
    <Provider store={customStore}>
      <Cart />
    </Provider>
  );

  const testQty = 10;

  await act(async () => {
    customStore.dispatch({
      type: 'cart/addToCart',
      payload: {
        id: 1,
        name: 'T-shirt',
        price: 1000,
        image: 'https://example.com/tshirt.jpg',
      },
    });
  });

  const plusButtons = screen.getAllByText('+');
  for (let i = 1; i < testQty; i++) {
    await act(async () => {
      fireEvent.click(plusButtons[plusButtons.length - 1]);
    });
  }

  const quantityElement = screen.getByTestId('quantity-1');
  expect(quantityElement).toHaveTextContent(`Quantity:−${testQty}+`);

  const minusButtons = screen.getAllByText('−');
  await act(async () => {
    fireEvent.click(minusButtons[minusButtons.length - 1]);
  });

  expect(quantityElement).toHaveTextContent(`Quantity:−${testQty - 1}+`);
});