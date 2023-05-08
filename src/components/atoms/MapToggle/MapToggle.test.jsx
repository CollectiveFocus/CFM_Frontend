import MapToggle from './MapToggle';
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('MapToggle', () => {
  const defaultProps = {
    currentView: MapToggle.view.map,
    setView: jest.fn(),
  };

  const getRender = (props = defaultProps) => render(<MapToggle {...props} />);

  it('should render with correct text when currentView is map', () => {
    const { asFragment } = getRender();
    expect(screen.getByText('Map View')).toBeVisible();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call setView function from props when button is clicked', () => {
    getRender();

    fireEvent.click(screen.getByText('Map View'));
    expect(defaultProps.setView).toHaveBeenCalledTimes(1);
  });
});
