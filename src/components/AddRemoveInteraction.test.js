// Polyfill for getSelection to prevent test errors related to element.ownerDocument.getSelection
if (!window.getSelection) {
  window.getSelection = () => ({
    removeAllRanges: () => {},
    addRange: () => {},
    getRangeAt: () => ({
      cloneRange: () => ({}),
    }),
  });
}
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Products from './Products';
import Wishlist from './Wishlist';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartSlice';
import wishlistReducer, { removeFromWishlist } from '../redux/wishlistSlice';
import productReducer from '../redux/productSlice';
import { toast } from 'react-toastify';
import * as productSlice from '../redux/productSlice';

// Mock toast to prevent console noise
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    info: jest.fn(),
  },
}));

const setupStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      cart: cartReducer,
      wishlist: wishlistReducer,
      product: productReducer,
    },
    preloadedState: {
      cart: preloadedState.cart || [],
      wishlist: preloadedState.wishlist || [],
      product: preloadedState.product || { items: [], loading: false },
    },
  });

test('adds product to cart when "Add to Cart" is clicked', async () => {
  jest.spyOn(productSlice, 'fetchProducts').mockImplementation(() => () => {});

  const store = setupStore({
    cart: [],
    wishlist: [],
    product: {
      items: [
        {
          id: 1,
          name: 'Test Product',
          title: 'Test Product',
          price: 99,
          image: 'https://example.com/product.jpg',
        },
      ],
      loading: false,
    },
  });

  render(
    <Provider store={store}>
      <Products />
    </Provider>
  );

  await waitFor(() => expect(screen.queryByText('Loading products…')).not.toBeInTheDocument());
  const addToCartButton = screen.getByText(/add to cart/i);

  fireEvent.click(addToCartButton);

  expect(toast.success).toHaveBeenCalledWith(expect.stringContaining('added to cart'));
});

test('removes product from wishlist when "Remove" is clicked', async () => {
  // Polyfill for getSelection if needed
  Object.defineProperty(window, 'getSelection', {
    writable: true,
    value: () => ({
      removeAllRanges: () => {},
      addRange: () => {},
      getRangeAt: () => ({
        cloneRange: () => ({}),
      }),
    }),
  });

  const store = setupStore({
    wishlist: [
      {
        id: 101,
        name: 'Watch',
        price: 999,
        image: 'https://example.com/watch.jpg',
      },
    ],
    cart: [],
  });

  render(
    <Provider store={store}>
      <Wishlist />
    </Provider>
  );

  const removeButton = screen.getByText(/remove/i);
  fireEvent.click(removeButton);

  await waitFor(() => {
  const removedItemHeadings = screen.queryAllByRole('heading', { level: 4 });
  const itemStillPresent = removedItemHeadings.find(el =>
    /watch/i.test(el.textContent)
  );
  expect(itemStillPresent).toBeUndefined();
});
});