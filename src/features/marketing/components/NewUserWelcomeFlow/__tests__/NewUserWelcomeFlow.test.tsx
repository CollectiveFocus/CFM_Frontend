import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { NewUserWelcomeFlow } from '../NewUserWelcomeFlow';

const NEW_USER_ONBOARDING_KEY = 'ff-new-user-onboarding';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();
const mockUseRouter = useRouter as jest.Mock;

describe('NewUserWelcomeFlow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.localStorage.clear();
    mockUseRouter.mockReturnValue({ push: mockPush });
  });

  it('renders first step content when open', () => {
    render(<NewUserWelcomeFlow open onClose={jest.fn()} />);

    expect(screen.getByText('Welcome to Fridge Finder!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('completes flow when Skip is clicked', () => {
    const onClose = jest.fn();
    render(<NewUserWelcomeFlow open onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: /skip/i }));

    expect(window.localStorage.getItem(NEW_USER_ONBOARDING_KEY)).toBe(
      'completed'
    );
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('shows Back button after advancing and navigates back', () => {
    render(<NewUserWelcomeFlow open onClose={jest.fn()} />);

    expect(screen.queryByRole('button', { name: /back/i })).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /back/i }));
    expect(screen.getByText('Welcome to Fridge Finder!')).toBeInTheDocument();
  });

  it('redirects to /browse and completes onboarding on final CTA', async () => {
    const onClose = jest.fn();
    render(<NewUserWelcomeFlow open onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    fireEvent.click(screen.getByRole('button', { name: /find a fridge/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/browse');
    });
    expect(window.localStorage.getItem(NEW_USER_ONBOARDING_KEY)).toBe(
      'completed'
    );
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
