import { deltaInMeters } from './geo';

describe('deltaInMeters', () => {
  it('calculates zero distance for identical coordinates', () => {
    const origin = [40.7128, -74.006]; // New York City
    const destination = [40.7128, -74.006];
    expect(deltaInMeters(origin, destination)).toBeCloseTo(0, 5);
  });

  it('calculates correct distance between two known points', () => {
    const nyc = [40.7128, -74.006];
    const la = [34.0522, -118.2437];
    const distance = deltaInMeters(nyc, la);
    expect(distance).toBeGreaterThan(3930000); // ~3936 km
    expect(distance).toBeLessThan(3960000);
  });

  it('calculates small distance accurately', () => {
    const pointA = [51.5007, -0.1246]; // London Eye
    const pointB = [51.5014, -0.1419]; // Buckingham Palace
    const distance = deltaInMeters(pointA, pointB);
    expect(distance).toBeGreaterThan(1000);
    expect(distance).toBeLessThan(2000);
  });
});
