beforeEach(() => {
  window.getSelection = () => ({
    removeAllRanges: () => {},
    addRange: () => {}
  });
  document.getSelection = () => ({
    removeAllRanges: () => {},
    addRange: () => {}
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './Contact';
import { MemoryRouter } from 'react-router-dom';

describe('Contact.js', () => {
  test('renders contact page header', () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Contact/i);
  });

  test('renders contact form fields', () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
  });

  test('renders submit button', () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  test('submits form and logs values', async () => {
    console.log = jest.fn();
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );
    await user.type(screen.getByLabelText(/Name/i), 'John Doe');
    await user.type(screen.getByLabelText(/Email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/Message/i), 'Hello there!');
    await user.click(screen.getByRole('button', { name: /Submit/i }));
    expect(console.log).toHaveBeenCalledWith('Form submitted:', {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello there!',
    });
  });
  test('submit does nothing if fields are empty', async () => {
    console.log = jest.fn(); // Spy on console
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: /Submit/i }));

    // Ensure console.log was not called
    expect(console.log).not.toHaveBeenCalled();

    // Ensure inputs remain empty
    expect(screen.getByLabelText(/Name/i)).toHaveValue('');
    expect(screen.getByLabelText(/Email/i)).toHaveValue('');
    expect(screen.getByLabelText(/Message/i)).toHaveValue('');
  });
  test('shows success message after successful form submission', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );
    await user.type(screen.getByLabelText(/Name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/Email/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/Message/i), 'Testing contact form');
    await user.click(screen.getByRole('button', { name: /Submit/i }));
    expect(screen.getByText(/Thanks for contacting us!/i)).toBeInTheDocument();
  });

  test('shows error messages when submitting empty form', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );
    await user.click(screen.getByRole('button', { name: /Submit/i }));
    expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Message is required/i)).toBeInTheDocument();
  });
});