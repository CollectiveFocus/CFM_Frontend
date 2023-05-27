import { fireEvent, render } from '@testing-library/react';
import ButtonLink from './ButtonLink';

describe('ButtonLink', () => {
  const renderButtonLink = (props) => render(<ButtonLink {...props} />);

  jest.mock(
    'next/link',
    () =>
      ({ children }) =>
        children
  );

  it('should render the ButtonLink component correctly', () => {
    const button = renderButtonLink({
      to: '/about',
      'aria-label': 'Learn more',
      variant: 'outlined',
    }).getByRole('link');
    expect(button).toMatchSnapshot();
  });

  it('should render the correct props', () => {
    const button = renderButtonLink({
      to: '/about',
      'aria-label': 'Learn more',
      variant: 'outlined',
    }).getByRole('link');

    expect(button).toHaveAttribute('href', '/about');
    expect(button).toHaveAttribute('aria-label', 'Learn more');
    expect(button).toHaveClass('MuiButton-outlined');
  });
});
