import { render, screen } from '@testing-library/react';
import PageFooter from './PageFooter';

describe('PageFooter', () => {
  it('renders the copyright notice', () => {
    render(<PageFooter />);
    expect(
      screen.getByText(/Fridge Finder. All rights reserved./i)
    ).toBeInTheDocument();
    const scrollLink = screen.queryByTitle(/Top of page/i);
    expect(scrollLink).toBeInTheDocument();
  });

  it('renders without the scroll button when scrollButton is false', () => {
    render(<PageFooter scrollButton={false} />);
    const scrollLink = screen.queryByTitle(/Top of page/i);
    expect(scrollLink).not.toBeInTheDocument();
  });
});
