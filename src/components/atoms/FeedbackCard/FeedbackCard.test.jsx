import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FeedbackCard from './FeedbackCard';

describe('FeedbackCard', () => {
  it('renders EmailSuccess variant correctly', () => {
    render(<FeedbackCard form="EmailSuccess" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Success!'
    );
    expect(screen.getByText('Your email was sent.')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Go to Home page' })
    ).toHaveAttribute('href', '/');
    expect(screen.getByAltText('Email success image')).toBeInTheDocument();
  });

  it('renders FridgeStatusSuccess variant correctly', () => {
    const slug = '/fridge/test-fridge-123';
    render(<FeedbackCard form="FridgeStatusSuccess" slug={slug} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Success!'
    );
    expect(
      screen.getByText('You have successfully submitted a status report!')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'View Fridge status' })
    ).toHaveAttribute('href', slug);
    expect(screen.getByAltText('Happy fridge image')).toBeInTheDocument();
  });

  it('renders Error variant correctly and triggers callback', () => {
    const mockFn = jest.fn();
    render(<FeedbackCard form="Error" slug={mockFn} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Error!'
    );
    expect(screen.getByText('Your email was not sent.')).toBeInTheDocument();
    const button = screen.getByRole('button', {
      name: 'Return to the form and try again',
    });
    expect(button).toHaveTextContent('TRY AGAIN');
    fireEvent.click(button);
    expect(mockFn).toHaveBeenCalled();
    expect(screen.getByAltText('Email error image')).toBeInTheDocument();
  });
});
