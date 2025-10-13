import PropTypes from 'prop-types';
import { render, screen } from '@testing-library/react';
import ButtonLink from './ButtonLink';

describe('ButtonLink', () => {
  let consoleErrorSpy;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockClear();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  const checkProps = (props) =>
    PropTypes.checkPropTypes(ButtonLink.propTypes, props, 'prop', 'ButtonLink');

  it('renders correctly with valid props', () => {
    render(
      <ButtonLink
        title="GO TO FRIDGE"
        to="/fridge/test-fridge-123"
        variant="contained"
        aria-label="View fridge status"
      />
    );
    const button = screen.getByRole('link', { name: 'View fridge status' });
    expect(button).toHaveTextContent('GO TO FRIDGE');
    expect(button).toHaveAttribute('href', '/fridge/test-fridge-123');
    expect(button).toHaveAttribute('aria-label', 'View fridge status');
    expect(button).toHaveClass('MuiButton-contained');
  });

  it('does not warn given all required props', () => {
    checkProps({
      title: 'GO TO FRIDGE',
      to: '/about',
      'aria-label': 'Go to About',
      variant: 'contained',
    });
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('warns if required props are missing', () => {
    checkProps({});
    expect(consoleErrorSpy).toHaveBeenCalled();

    const message = consoleErrorSpy.mock.calls.flat().join('\n');
    expect(message).toMatch('The prop `title` is marked as required');
    expect(message).toMatch('The prop `to` is marked as required');
    expect(message).toMatch('The prop `aria-label` is marked as required');
    expect(message).toMatch('The prop `variant` is marked as required');
  });

  it('warns if `to` prop is missing the `query` key', () => {
    checkProps({
      title: 'GO TO FRIDGE',
      to: { pathname: '/only-pathname' }, // missing `query`
      'aria-label': 'Broken link',
      variant: 'contained',
    });
    expect(consoleErrorSpy).toHaveBeenCalled();

    const message = consoleErrorSpy.mock.calls.flat().join('\n');
    expect(message).toMatch('Invalid prop `to` supplied to `ButtonLink`');
  });

  it('warns if `variant` prop has an invalid enum value', () => {
    checkProps({
      title: 'GO TO FRIDGE',
      to: '/about',
      'aria-label': 'Go to About',
      variant: 'invalid-variant', // invalid value
    });
    expect(consoleErrorSpy).toHaveBeenCalled();

    const message = consoleErrorSpy.mock.calls.flat().join('\n');
    expect(message).toMatch(
      'Invalid prop `variant` of value `invalid-variant` supplied to `ButtonLink`'
    );
  });
});
