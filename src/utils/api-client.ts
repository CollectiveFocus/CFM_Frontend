import { ApiFridge, FridgeReport } from 'types/domain';

const BASE_URL = process.env.NEXT_PUBLIC_FF_API_URL || 'http://127.0.0.1:3050';

class ApiError extends Error {
  constructor(
    public message: string,
    public status?: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      throw new ApiError(
        `API request failed: ${response.statusText}`,
        response.status
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(
      error instanceof Error ? error.message : 'Unknown network error'
    );
  }
}

export const apiClient = {
  getFridges: () => request<ApiFridge[]>('/v1/fridges/'),
  getReports: () => request<FridgeReport[]>('/v1/reports/'),
};
