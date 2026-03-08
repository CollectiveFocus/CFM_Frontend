import React from 'react';
import { render, screen } from '@testing-library/react';
import { PageHero } from './PageHero';

describe('PageHero', () => {
  const mockImg = {
    src: '/hero/index.webp',
    alt: 'Mock image',
  };

  const mockButton = {
    to: '/path',
    'aria-label': 'Learn more about the Fridge Finder project',
    title: 'Click Me',
    variant: 'contained' as const,
  };

  it('renders correctly with image and button', () => {
    render(<PageHero img={mockImg} button={mockButton} />);
    expect(screen.getByAltText('Mock image')).toBeInTheDocument();
    expect(screen.getByText('Click Me')).toBeInTheDocument();
    expect(screen.getByText('Click Me')).toHaveAttribute(
      'aria-label',
      'Learn more about the Fridge Finder project'
    );
  });

  it('renders correctly without button', () => {
    render(<PageHero img={mockImg} />);
    expect(screen.getByAltText('Mock image')).toBeInTheDocument();
    expect(screen.queryByRole('button')).toBeNull();
  });
});
