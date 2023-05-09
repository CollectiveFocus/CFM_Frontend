import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ButtonLink from './ButtonLink';

describe('ButtonLink', () => {
  const defaultProps = {
    to: '/about',
    'aria-label': 'Learn more',
    variant: 'outlined',
  };

  const getRender = (props = defaultProps) => render(<ButtonLink {...props} />);

  it('should render the correct props', () => {
    const { getByRole } = getRender();

    const button = getByRole('button');
    console.log('🚀 ~ file: ButtonLink.test.jsx:17 ~ it ~ button:', button);
    expect(button).toHaveAttribute('href', '/about');
    expect(button).toHaveAttribute('aria-label', 'Learn more');
    expect(button).toHaveClass('MuiButton-contained');
  });
});
