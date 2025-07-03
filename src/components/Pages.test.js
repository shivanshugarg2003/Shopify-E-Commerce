import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // ✅ ADD THIS
import Pages from './Pages'; // ✅ ensure path is correct

test('renders Pages heading', () => {
  render(
    <MemoryRouter>
      <Pages />
    </MemoryRouter>
  );
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
});