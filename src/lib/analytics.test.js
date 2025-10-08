import path from 'path';

describe('Google Analytics module', () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...ORIGINAL_ENV };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('uses the production ID when NODE_ENV is production', () => {
    process.env.NODE_ENV = 'production';
    process.env.NEXT_PUBLIC_ANALYTICS_ID = 'PROD-123';
    const googleAnalytics = require(
      path.resolve(__dirname, '../lib/analytics')
    ).default;
    expect(googleAnalytics.TRACKING_ID).toBe('PROD-123');
  });

  it('uses the development ID when NODE_ENV is development', () => {
    process.env.NODE_ENV = 'development';
    process.env.NEXT_PUBLIC_ANALYTICS_ID = 'DEV-456';
    const googleAnalytics = require(
      path.resolve(__dirname, '../lib/analytics')
    ).default;
    expect(googleAnalytics.TRACKING_ID).toBe('DEV-456');
  });

  it('falls back to empty string if NEXT_PUBLIC_ANALYTICS_ID is undefined', () => {
    process.env.NODE_ENV = 'production';
    delete process.env.NEXT_PUBLIC_ANALYTICS_ID;
    const googleAnalytics = require(
      path.resolve(__dirname, '../lib/analytics')
    ).default;
    expect(googleAnalytics.TRACKING_ID).toBe('');
  });
});
