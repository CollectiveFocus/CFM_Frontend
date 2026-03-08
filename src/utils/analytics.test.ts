/* eslint-disable @typescript-eslint/no-require-imports */
import path from 'path';
import {
  describe,
  it,
  expect,
  beforeEach,
  afterAll,
  jest,
} from '@jest/globals';

describe('Google Analytics module', () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...ORIGINAL_ENV };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('uses NEXT_PUBLIC_ANALYTICS_ID when set', () => {
    process.env.NEXT_PUBLIC_ANALYTICS_ID = 'PROD-123';
    const googleAnalytics = require(
      path.resolve(__dirname, './analytics')
    ).default;
    expect(googleAnalytics.TRACKING_ID).toBe('PROD-123');
  });

  it('uses a different NEXT_PUBLIC_ANALYTICS_ID value', () => {
    process.env.NEXT_PUBLIC_ANALYTICS_ID = 'DEV-456';
    const googleAnalytics = require(
      path.resolve(__dirname, './analytics')
    ).default;
    expect(googleAnalytics.TRACKING_ID).toBe('DEV-456');
  });

  it('falls back to empty string if NEXT_PUBLIC_ANALYTICS_ID is undefined', () => {
    delete process.env.NEXT_PUBLIC_ANALYTICS_ID;
    const googleAnalytics = require(
      path.resolve(__dirname, './analytics')
    ).default;
    expect(googleAnalytics.TRACKING_ID).toBe('');
  });
});
