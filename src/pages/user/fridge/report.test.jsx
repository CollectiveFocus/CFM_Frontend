import FridgeReportPage from './report';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Report', () => {
  it('should render with expected text', () => {
    const { asFragment } = render(<FridgeReportPage a={true} />);

    expect(screen.getByText('Fridge Status Report')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
