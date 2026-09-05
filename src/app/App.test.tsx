import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from './App';

afterEach(cleanup);

test('navigates from catalog to product and back', async () => {
  render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: ['/products'] })} />);
  fireEvent.click(screen.getByRole('link', { name: 'Product 1' }));
  expect(await screen.findByRole('heading', { name: 'Product Details' })).toBeInTheDocument();
  expect(screen.getByText('Product 1')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: 'Back' }));
  expect(await screen.findByRole('heading', { name: 'Products' })).toBeInTheDocument();
});

test('unknown products provide a recovery link', () => {
  render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: ['/products/missing'] })} />);
  expect(screen.getByRole('heading', { name: 'Product not found' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Browse products' })).toHaveAttribute('href', '/products');
});

test('unknown routes render the route error page', () => {
  render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: ['/missing'] })} />);
  expect(screen.getByRole('heading', { name: 'An error occurred!' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
});
