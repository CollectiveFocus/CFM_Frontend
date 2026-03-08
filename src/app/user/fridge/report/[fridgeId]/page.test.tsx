import '@testing-library/jest-dom';

// Mock next/navigation with useParams spy
jest.mock('next/navigation', () => ({
  useParams: () => ({ fridgeId: 'test-fridge-123' }),
}));

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FridgeReportPage from './page';

describe('FridgeReportPage', () => {
  beforeEach(() => {
    (global as any).fetch = jest.fn(() =>
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

    // Trigger submit
    fireEvent.click(screen.getByLabelText('Submit status update'));

    // Wait for the success panel rendered by FeedbackCard
    const successPanel = await screen.findByText(
      'You have successfully submitted a status report!'
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

  it('shows success feedback with link to fridge on successful submit', async () => {
    render(<FridgeReportPage />);
    fireEvent.click(screen.getByLabelText('Submit status update'));

    await waitFor(() => {
      const link = screen.getByRole('link', { name: 'View Fridge status' });
      expect(link).toHaveAttribute('href', '/fridge/test-fridge-123');
    });
  });

  it('shows error feedback on failed submit and allows retry', async () => {
    (global as any).fetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: false } as any);
    render(<FridgeReportPage />);
    fireEvent.click(screen.getByLabelText('Submit status update'));

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Error!'
      );
    });

    // Retry button brings back the form
    fireEvent.click(
      screen.getByRole('button', { name: 'Return to the form and try again' })
    );
    await waitFor(() => {
      expect(screen.getByText('Fridge Status Report')).toBeInTheDocument();
    });
  });

  it('shows error feedback on fetch error', async () => {
    (global as any).fetch = jest
      .fn()
      .mockRejectedValueOnce(new Error('Network error') as any);
    render(<FridgeReportPage />);
    fireEvent.click(screen.getByLabelText('Submit status update'));

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Error!'
      );
    });
  });
});
