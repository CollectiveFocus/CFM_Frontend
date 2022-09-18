export function groupWithinBound(boundInMeters, geoList) {
  if (geoList.length <= 1) {
    return [];
  }

  const origin = [geoList[0].lat, geoList[0].lng];
  const insideBound = [geoList[0]],
    outsideBound = [];

  for (let ix = 1; ix < geoList.length; ++ix) {
    const destination = [geoList[ix].lat, geoList[ix].lng];
    if (deltaInMeters(origin, destination) <= boundInMeters) {
      insideBound.push(geoList[ix]);
    } else {
      outsideBound.push(geoList[ix]);
    }
  }

  return insideBound.length > 1
    ? [insideBound].concat(groupWithinBound(boundInMeters, outsideBound))
    : groupWithinBound(boundInMeters, outsideBound);
}

/**
 * Distance in meters between two geo coordinates
 *
 * From https://stackoverflow.com/questions/43167417/calculate-distance-between-two-points-in-leaflet
 * By https://stackoverflow.com/users/4496505/gaurav-mukherjee
 */
export function deltaInMeters(origin, destination) {
  const lon1 = toRadian(origin[1]),
    lat1 = toRadian(origin[0]),
    lon2 = toRadian(destination[1]),
    lat2 = toRadian(destination[0]);

  const deltaLat = lat2 - lat1;
  const deltaLon = lon2 - lon1;

  const a =
    Math.pow(Math.sin(deltaLat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
  const c = 2 * Math.asin(Math.sqrt(a));
  const EARTH_RADIUS = 6371;
  return c * EARTH_RADIUS * 1000;
}

function toRadian(degree) {
  return (degree * Math.PI) / 180;
}
