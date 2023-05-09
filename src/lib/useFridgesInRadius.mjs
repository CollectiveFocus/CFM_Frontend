import { useEffect, useMemo, useState } from 'react';
import { deltaInMiles } from './geo.mjs';

export default function useFridgesInRadius(
  fridgeList,
  userPosition,
  radius = 5
) {
  // Radius in miles
  const [fridgesInRadius, setFridgesInRadius] = useState(fridgeList);
  const defaultPos = { lat: 40.697759, lng: -73.927282 };

  function filterMarkersByRadius(_userPosition) {
    const center = [_userPosition.lat, _userPosition.lng];
    const fridgesWithinRadius = fridgeList.filter((fridge) => {
      const fridgePos = [fridge.location.geoLat, fridge.location.geoLng];

      const distance = deltaInMiles(center, fridgePos, 'miles');

      return distance <= radius;
    });
    return fridgesWithinRadius;
  }

  useEffect(() => {
    if (userPosition) {
      setFridgesInRadius(filterMarkersByRadius(userPosition));
    } else {
      setFridgesInRadius(filterMarkersByRadius(defaultPos));
    }
  }, [userPosition, radius]);

  return [fridgesInRadius];
}

export function useSortedFridgesInRadius(fridgeList, userPosition, radius = 5) {
  // Radius in miles
  const [fridgesInRadius, setFridgesInRadius] = useState(fridgeList);
  const defaultPos = { lat: 40.697759, lng: -73.927282 };

  function filterMarkersByRadius(_userPosition) {
    const center = [_userPosition.lat, _userPosition.lng];

    const fridgesDistance = fridgeList.map((fridge) => {
      const fridgePos = [fridge.location.geoLat, fridge.location.geoLng];
      const distance = deltaInMiles(center, fridgePos);
      return {
        fridge,
        distFromUser: distance,
        whithinRadius: distance <= radius,
      };
    });

    return fridgesDistance
      .filter((f) => f.whithinRadius)
      .sort((a, b) => a.distFromUser - b.distFromUser)
      .map((i) => i.fridge);
  }

  useEffect(() => {
    if (userPosition) {
      setFridgesInRadius(filterMarkersByRadius(userPosition));
    } else {
      setFridgesInRadius(filterMarkersByRadius(defaultPos));
    }
  }, [userPosition, radius]);

  return [fridgesInRadius];
}
