import { render } from '@testing-library/react';
import PageHero from './PageHero';

describe('PageHero', () => {
  const mockImg = {
    src: '/hero/index.webp',
    alt: 'Mock image',
  };

  const mockButton = {
    to: '/path',
    'aria-label': 'Learn more about the Fridge Finder project',
    title: 'Click Me',
    variant: 'contained',
  };

  it('renders correctly with image and button', () => {
    const { getByAltText, getByText } = render(
      <PageHero img={mockImg} button={mockButton} />
    );
    // The Hero should have an image and a button that contains aria-label and a title of the button
    expect(getByAltText('Mock image')).toBeInTheDocument();

    expect(getByText('Click Me')).toBeInTheDocument();

    expect(getByText('Click Me')).toHaveAttribute(
      'aria-label',
      'Learn more about the Fridge Finder project'
    );
  });

  it('renders correctly without button', () => {
    const { getByAltText, queryByRole } = render(<PageHero img={mockImg} />);
    // The Hero should show the Image only
    expect(getByAltText('Mock image')).toBeInTheDocument();

    expect(queryByRole('button')).toBeNull();
  });
});
