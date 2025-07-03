import React from 'react'; // ✅ Required
import { render, screen } from '@testing-library/react';
import Terms from './Terms';

test('renders Terms and Conditions heading', () => {
  render(<Terms />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/terms and conditions/i);
});