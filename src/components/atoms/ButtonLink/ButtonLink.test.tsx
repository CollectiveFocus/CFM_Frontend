import React from 'react';
import { render, screen } from '@testing-library/react';
import { ButtonLink } from './ButtonLink';

describe('ButtonLink', () => {
  it('renders correctly with valid props', () => {
    render(
      <ButtonLink
        title="GO TO FRIDGE"
        to="/fridge/test-fridge-123"
        variant="contained"
        aria-label="View fridge status"
      />
    );
    const link = screen.getByRole('link', { name: 'View fridge status' });
    expect(link).toHaveTextContent('GO TO FRIDGE');
    expect(link).toHaveAttribute('href', '/fridge/test-fridge-123');
    expect(link).toHaveAttribute('aria-label', 'View fridge status');
    expect(link).toHaveClass('MuiButton-contained');
  });

  it('renders an outlined variant', () => {
    render(
      <ButtonLink
        title="Cancel"
        to="/browse"
        variant="outlined"
        aria-label="Return to map page"
      />
    );
    const link = screen.getByRole('link', { name: 'Return to map page' });
    expect(link).toHaveClass('MuiButton-outlined');
  });

  it('renders with href including query parameters', () => {
    render(
      <ButtonLink
        title="Search"
        to="/browse?q=test"
        variant="contained"
        aria-label="Search fridges"
      />
    );
    const link = screen.getByRole('link', { name: 'Search fridges' });
    expect(link).toHaveAttribute('href', '/browse?q=test');
  });
});
