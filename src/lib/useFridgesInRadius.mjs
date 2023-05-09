import { useEffect, useState } from 'react';
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

      const distance = deltaInMiles(center, fridgePos);

      return distance <= radius;
    });
    setFridgesInRadius(fridgesWithinRadius);
  }

  useEffect(() => {
    if (userPosition) {
      filterMarkersByRadius(userPosition);
    } else {
      filterMarkersByRadius(defaultPos);
    }
  }, [userPosition, radius]);

  return [fridgesInRadius];
}
