import { render } from '@testing-library/react';
import PageFooter from './PageFooter';

describe('PageFooter', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<PageFooter />);

    // Make sure that the copyright text is rendered
    expect(
      getByText(/2022, Collective Focus. All rights reserved./i)
    ).toBeInTheDocument();

    // Make sure that the cookie text is rendered
    expect(
      getByText(/We may use cookies for storing information/i)
    ).toBeInTheDocument();
  });

  it('renders correctly with fixedAtBottom prop', () => {
    const { container } = render(<PageFooter fixedAtBottom />);

    // The footer should have 'fixed' position style
    expect(container.firstChild).toHaveStyle('position: fixed');

    // The scrollButton is not rendered
    expect(container.querySelector('ScrollButton')).toBeNull();
  });
});
