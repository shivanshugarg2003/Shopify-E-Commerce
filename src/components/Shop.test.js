import React from 'react'; // ✅ Required
import { render, screen } from '@testing-library/react';
import Shop from './Shop';

test('renders Shop page heading', () => {
  render(<Shop />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/shop/i);
});