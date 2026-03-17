import { useState, useEffect } from 'react';

export function useNeighborhood(
  lat?: number,
  lng?: number,
  fallbackCity?: string
) {
  const [neighborhood, setNeighborhood] = useState<string>(fallbackCity || '');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    if (!lat || !lng) {
      setLoading(false);
      return;
    }

    const fetchNeighborhood = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=jsonv2`
        );
        const data = await res.json();

        if (isMounted) {
          const area =
            data?.address?.neighbourhood ||
            data?.address?.suburb ||
            data?.address?.city_district ||
            data?.address?.city ||
            fallbackCity;

          if (area) {
            setNeighborhood(area);
          }
        }
      } catch (error) {
        console.error('Failed to reverse geocode neighborhood:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchNeighborhood();

    return () => {
      isMounted = false;
    };
  }, [lat, lng, fallbackCity]);

  return { neighborhood, loading };
}
