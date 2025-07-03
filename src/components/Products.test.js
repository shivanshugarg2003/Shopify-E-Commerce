import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Products from './Products';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { addToCart } from '../redux/cartSlice';
import { addToWishlist, removeFromWishlist } from '../redux/wishlistSlice';
import { ToastContainer } from 'react-toastify';

const mockStore = configureStore([]);

describe('Products component', () => {
  let store;

  const fallbackProducts = [
    { id: 1, name: 'T-Shirt', price: 1000, image: '/images/tshirt.jpg' },
    { id: 2, name: 'Jeans', price: 2000, image: '/images/jeans.jpg' },
    { id: 3, name: 'Shoes', price: 3000, image: '/images/shoes.jpg' }
  ];

  it('renders fallback products when store is empty', () => {
    store = mockStore({
      product: { items: [] },
      cart: { items: [] },
      wishlist: []
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <ToastContainer />
        <Products />
      </Provider>
    );

    fallbackProducts.forEach(p => {
      expect(screen.getByText(p.name)).toBeInTheDocument();
      expect(screen.getByText(`₹${p.price}`)).toBeInTheDocument();
    });
  });

  it('dispatches addToCart on button click', () => {
    store = mockStore({
      product: { items: fallbackProducts },
      cart: { items: [] },
      wishlist: []
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <ToastContainer />
        <Products />
      </Provider>
    );

    const cartButtons = screen.getAllByText('Add to Cart');
    fireEvent.click(cartButtons[0]);

    expect(store.dispatch).toHaveBeenCalledWith(addToCart(fallbackProducts[0]));
  });

  it('dispatches addToWishlist when not in wishlist', () => {
    store = mockStore({
      product: { items: fallbackProducts },
      cart: { items: [] },
      wishlist: []
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <ToastContainer />
        <Products />
      </Provider>
    );

    const wishlistButtons = screen.getAllByText('Add to Wishlist');
    fireEvent.click(wishlistButtons[1]);

    expect(store.dispatch).toHaveBeenCalledWith(addToWishlist(fallbackProducts[1]));
  });

  it('dispatches removeFromWishlist when already in wishlist', () => {
    store = mockStore({
      product: { items: fallbackProducts },
      cart: { items: [] },
      wishlist: [fallbackProducts[2]]
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <ToastContainer />
        <Products />
      </Provider>
    );

    const removeButtons = screen.getAllByText('Remove from Wishlist');
    fireEvent.click(removeButtons[0]);

    expect(store.dispatch).toHaveBeenCalledWith(removeFromWishlist(fallbackProducts[2].id));
  });
});