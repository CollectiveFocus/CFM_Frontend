// Mock next/router with push spy
const pushMock = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { fridgeId: 'test-fridge-123' },
    push: pushMock,
  }),
}));

jest.mock('components/atoms/ButtonLink', () => ({
  __esModule: true,
  default: (props) => (
    <a href={props.to} {...props}>
      {props.children}
    </a>
  ),
}));

jest.mock('components/atoms/FeedbackCard', () => ({
  __esModule: true,
  default: ({ form, slug }) => {
    // if statement based on typeof slug
    let action = null;
    switch (typeof slug) {
      case 'function':
        action = <button onClick={slug}>Retry</button>;
        break;
      case 'string':
        action = <button onClick={() => pushMock(slug)}>GO TO FRIDGE</button>;
        break;
    }

    return (
      <div>
        Feedback: {form}
        {action}
      </div>
    );
  },
}));

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FridgeReportPage from './[fridgeId]';

describe('FridgeReportPage', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ message: 'Success' }),
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the form with fridgeId', () => {
    render(<FridgeReportPage />);
    expect(screen.getByText('Fridge Status Report')).toBeInTheDocument();
    expect(screen.getByText('test-fridge-123')).toBeInTheDocument();
    expect(screen.getByLabelText('Notes')).toBeInTheDocument();
    expect(screen.getByLabelText('Submit status update')).toBeInTheDocument();
    expect(screen.getByLabelText('Return to map page')).toHaveAttribute(
      'href',
      '/browse'
    );
  });

  it('allows user to fill and submit the form', async () => {
    render(<FridgeReportPage />);
    // Select a radio option
    fireEvent.click(screen.getByLabelText('Fridge needs cleaning'));
    // Move slider (simulate change event)
    fireEvent.change(screen.getByLabelText('Amount of food in the fridge'), {
      target: { value: 2 },
    });
    // Enter notes
    fireEvent.change(screen.getByLabelText('Notes'), {
      target: { value: 'Some notes' },
    });
    // trigger submit
    fireEvent.click(screen.getByLabelText('Submit status update'));

    // wait for the success panel rendered by FeedbackCard
    const successPanel = await screen.findByText(
      'Feedback: FridgeStatusSuccess'
    );
    expect(successPanel).toBeInTheDocument();

    // Check fetch called with correct data
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/v1/fridges/test-fridge-123/reports'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('Some notes'),
      })
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('navigates to fridge status page on GO TO FRIDGE click', async () => {
    render(<FridgeReportPage />);
    // Submit to show success panel
    fireEvent.click(screen.getByLabelText('Submit status update'));
    const goToFridgeBtn = await screen.findByText('GO TO FRIDGE');
    fireEvent.click(goToFridgeBtn);
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/fridge/test-fridge-123');
    });
  });

  it('shows error feedback on failed submit and allows retry', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false });
    render(<FridgeReportPage />);
    fireEvent.click(screen.getByLabelText('Submit status update'));
    await waitFor(() => {
      expect(screen.getByText('Feedback: EmailError')).toBeInTheDocument();
    });

    // Retry button brings back the form
    fireEvent.click(screen.getByText('Retry'));
    await waitFor(() => {
      expect(screen.getByText('Fridge Status Report')).toBeInTheDocument();
    });
  });

  it('shows error feedback on fetch error', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));
    render(<FridgeReportPage />);
    fireEvent.click(screen.getByLabelText('Submit status update'));
    await waitFor(() => {
      expect(screen.getByText('Feedback: EmailError')).toBeInTheDocument();
    });
  });
});
