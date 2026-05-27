import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MyFridgesPage } from '../MyFridgesPage';
import { useAuthStore } from 'store/useAuthStore';
import { useFridgeStore } from 'store/useFridgeStore';
import { getAllUserNotifications } from '../../utils/fridgeNotificationsApi';
import { Fridge } from 'types/domain';

// ---------------------------------------------------------------------------
// Module mocks
// ---------------------------------------------------------------------------

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

jest.mock('theme/icons', () => ({
  MapLegendConditionDirtyIcon: () => null,
  MapLegendConditionOutOfOrderIcon: () => null,
  MapLegendPinLocationIcon: () => null,
  MapLegendPinNotAtLocationIcon: () => null,
  MapLegendPinGhostIcon: () => null,
  MapLegendPinNoReportIcon: () => null,
}));

jest.mock('store/useAuthStore', () => ({ useAuthStore: jest.fn() }));
jest.mock('store/useFridgeStore', () => ({ useFridgeStore: jest.fn() }));
jest.mock('../../utils/fridgeNotificationsApi', () => ({
  getAllUserNotifications: jest.fn(),
}));

// ---------------------------------------------------------------------------
// Typed mock references
// ---------------------------------------------------------------------------

const mockUseAuthStore = useAuthStore as unknown as jest.Mock;
const mockUseFridgeStore = useFridgeStore as unknown as jest.Mock;
const mockGetAllUserNotifications = getAllUserNotifications as jest.Mock;

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const mockUser = {
  uid: 'user-1',
  getIdToken: jest.fn().mockResolvedValue('token-123'),
};

const baseFridge: Fridge = {
  id: 'fridge-1',
  name: 'Test Fridge',
  verified: true,
  location: {
    street: '123 Main St',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11201',
    geoLat: 40.7,
    geoLng: -74.0,
  },
  maintainer: {},
  report: {
    fridgeId: 'fridge-1',
    timestamp: '2024-01-15T10:30:00.000Z',
    condition: 'good',
    foodPercentage: 2,
  },
};

const mockNotification = {
  userId: 'user-1',
  fridgeId: 'fridge-1',
  contactTypePreferences: {},
};

const mockFetchFridges = jest.fn().mockResolvedValue(undefined);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function setupStores({
  authStatus = 'authenticated' as const,
  user = mockUser as typeof mockUser | null,
  fridgeStatus = 'success' as string,
  getFridgeById = jest.fn().mockReturnValue(baseFridge),
} = {}) {
  mockUseAuthStore.mockReturnValue({ user, status: authStatus });
  mockUseFridgeStore.mockReturnValue({
    status: fridgeStatus,
    fetchFridges: mockFetchFridges,
    getFridgeById,
  });
}

beforeEach(() => {
  jest.clearAllMocks();
  mockUser.getIdToken.mockResolvedValue('token-123');
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('MyFridgesPage', () => {
  describe('auth loading state', () => {
    it('renders a loading spinner while auth status is loading', () => {
      setupStores({ authStatus: 'loading', user: null });
      mockGetAllUserNotifications.mockReturnValue(new Promise(() => {}));

      render(<MyFridgesPage />);

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('unauthenticated state', () => {
    it('renders a sign-in empty state when the user is not authenticated', () => {
      setupStores({ authStatus: 'unauthenticated', user: null });
      mockGetAllUserNotifications.mockReturnValue(new Promise(() => {}));

      render(<MyFridgesPage />);

      expect(
        screen.getByText(/sign in to view fridges you follow/i)
      ).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: /sign in/i })
      ).toBeInTheDocument();
    });
  });

  describe('data loading state', () => {
    it('renders a loading spinner while fridge data is still loading', () => {
      setupStores({ fridgeStatus: 'loading' });
      mockGetAllUserNotifications.mockReturnValue(new Promise(() => {}));

      render(<MyFridgesPage />);

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders a loading spinner while notifications have not resolved', () => {
      setupStores();
      // Never resolves — keeps notifStatus as 'loading'
      mockGetAllUserNotifications.mockReturnValue(new Promise(() => {}));

      render(<MyFridgesPage />);

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('empty state', () => {
    it('shows the browse CTA when the user follows no fridges', async () => {
      setupStores({ getFridgeById: jest.fn().mockReturnValue(undefined) });
      mockGetAllUserNotifications.mockResolvedValue([]);

      render(<MyFridgesPage />);

      await waitFor(() => {
        expect(
          screen.getByText(/not following any fridges yet/i)
        ).toBeInTheDocument();
      });
      expect(
        screen.getByRole('link', { name: /find fridges near you/i })
      ).toBeInTheDocument();
    });
  });

  describe('populated fridge list', () => {
    it('renders the fridge name when a followed fridge is loaded', async () => {
      setupStores();
      mockGetAllUserNotifications.mockResolvedValue([mockNotification]);

      render(<MyFridgesPage />);

      await waitFor(() => {
        expect(screen.getByText('Test Fridge')).toBeInTheDocument();
      });
    });

    it('shows the "Find More Fridges" button when the list is populated', async () => {
      setupStores();
      mockGetAllUserNotifications.mockResolvedValue([mockNotification]);

      render(<MyFridgesPage />);

      await waitFor(() => {
        expect(
          screen.getByRole('link', { name: /find more fridges/i })
        ).toBeInTheDocument();
      });
    });

    it('shows the fridge street address', async () => {
      setupStores();
      mockGetAllUserNotifications.mockResolvedValue([mockNotification]);

      render(<MyFridgesPage />);

      await waitFor(() => {
        expect(screen.getByText('123 Main St, Brooklyn')).toBeInTheDocument();
      });
    });
  });

  describe('ConditionBadge', () => {
    it('shows "Needs Cleaning" for a fridge with dirty condition', async () => {
      const dirtyFridge: Fridge = {
        ...baseFridge,
        report: { ...baseFridge.report!, condition: 'dirty' },
      };
      setupStores({ getFridgeById: jest.fn().mockReturnValue(dirtyFridge) });
      mockGetAllUserNotifications.mockResolvedValue([mockNotification]);

      render(<MyFridgesPage />);

      await waitFor(() => {
        expect(screen.getByText('Needs Cleaning')).toBeInTheDocument();
      });
    });

    it('shows "Needs Repairs" for a fridge with out of order condition', async () => {
      const outOfOrderFridge: Fridge = {
        ...baseFridge,
        report: { ...baseFridge.report!, condition: 'out of order' },
      };
      setupStores({
        getFridgeById: jest.fn().mockReturnValue(outOfOrderFridge),
      });
      mockGetAllUserNotifications.mockResolvedValue([mockNotification]);

      render(<MyFridgesPage />);

      await waitFor(() => {
        expect(screen.getByText('Needs Repairs')).toBeInTheDocument();
      });
    });

    it('does not show a condition badge for a fridge with good condition', async () => {
      setupStores(); // baseFridge has condition: 'good'
      mockGetAllUserNotifications.mockResolvedValue([mockNotification]);

      render(<MyFridgesPage />);

      await waitFor(() => {
        expect(screen.getByText('Test Fridge')).toBeInTheDocument();
      });

      expect(screen.queryByText('Needs Cleaning')).not.toBeInTheDocument();
      expect(screen.queryByText('Needs Repairs')).not.toBeInTheDocument();
      expect(screen.queryByText('Not at Location')).not.toBeInTheDocument();
    });

    it('does not show a condition badge for an unknown condition', async () => {
      const unknownConditionFridge: Fridge = {
        ...baseFridge,
        report: { ...baseFridge.report!, condition: 'moldy' },
      };
      setupStores({
        getFridgeById: jest.fn().mockReturnValue(unknownConditionFridge),
      });
      mockGetAllUserNotifications.mockResolvedValue([mockNotification]);

      render(<MyFridgesPage />);

      await waitFor(() => {
        expect(screen.getByText('Test Fridge')).toBeInTheDocument();
      });

      // Unknown conditions return null — no label rendered
      expect(screen.queryByText('moldy')).not.toBeInTheDocument();
    });
  });

  describe('no report state', () => {
    it('shows "No status" when the fridge has no report', async () => {
      const noReportFridge: Fridge = { ...baseFridge, report: null };
      setupStores({ getFridgeById: jest.fn().mockReturnValue(noReportFridge) });
      mockGetAllUserNotifications.mockResolvedValue([mockNotification]);

      render(<MyFridgesPage />);

      await waitFor(() => {
        expect(screen.getByText('No status')).toBeInTheDocument();
      });
    });
  });
});
