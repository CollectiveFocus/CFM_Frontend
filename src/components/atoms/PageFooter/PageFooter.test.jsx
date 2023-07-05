import { render } from '@testing-library/react';
import PageFooter from './PageFooter';

describe('PageFooter', () => {
  it('renders with copyright and cookie consent text', () => {
    const { getByText } = render(<PageFooter />);

    // Make sure that the copyright text is rendered
    expect(
      getByText(/Fridge Finder. All rights reserved./i)
    ).toBeInTheDocument();

    // Make sure that the cookie text is rendered
    expect(
      getByText(/We may use cookies for storing information/i)
    ).toBeInTheDocument();
  });
});
