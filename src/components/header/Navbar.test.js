import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import NavBar from './NavBar';
import { configureStore } from '@reduxjs/toolkit';

// Minimal mock reducer
const cartReducer = (state = [], action) => state;

const renderWithStore = (cartItems) => {
  const store = configureStore({
    reducer: {
      cart: () => cartItems,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    </Provider>
  );
};

describe('NavBar Component', () => {
  test('renders all navigation links', () => {
    renderWithStore([]);

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Pages/i)).toBeInTheDocument();
    expect(screen.getByText(/Products/i)).toBeInTheDocument();
    expect(screen.getByText(/Shop/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument();
  });

  test('displays correct cart count with items', () => {
    const cartItems = [
      { id: 1, name: 'T-shirt', quantity: 2 },
      { id: 2, name: 'Shoes', quantity: 3 },
    ];

    renderWithStore(cartItems);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('displays 0 when cart is empty', () => {
    renderWithStore([]);
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});