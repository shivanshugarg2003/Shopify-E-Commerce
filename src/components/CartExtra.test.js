import React from 'react'; // ✅ Missing import
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Cart from './Cart';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartSlice';
import userEvent from '@testing-library/user-event';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

describe('Cart.js Extra Coverage', () => {
  const setup = () =>
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

  it('renders Cart header', () => {
    setup();
    expect(screen.getByRole('heading', { level: 2, name: /your cart/i })).toBeInTheDocument();
  });

  it('shows empty cart message when no items', () => {
    setup();
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it('renders cart with items and displays them correctly', () => {
    store.dispatch({
      type: 'cart/addToCart',
      payload: {
        id: 1,
        name: 'T-shirt',
        price: 1000,
        quantity: 2,
        image: 'https://example.com/tshirt.jpg'
      },
    });

    setup();

    expect(screen.getByText(/t-shirt/i)).toBeInTheDocument();
    const priceElements = screen.getAllByText(/₹1000/i);
expect(priceElements.length).toBeGreaterThanOrEqual(1);
  });

  it('matches snapshot with empty cart', () => {
    // Remove all items from the cart to ensure it is empty
    store.dispatch({ type: 'cart/removeFromCart', payload: 1 });
    store.dispatch({ type: 'cart/removeFromCart', payload: 2 });
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with items in cart', () => {
    // Remove any prior items and add only Jeans
    store.dispatch({ type: 'cart/removeFromCart', payload: 1 });
    store.dispatch({ type: 'cart/removeFromCart', payload: 2 });
    store.dispatch({
      type: 'cart/addToCart',
      payload: {
        id: 2,
        name: 'Jeans',
        price: 2000,
        quantity: 1,
        image: 'https://example.com/jeans.jpg'
      },
    });

    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});