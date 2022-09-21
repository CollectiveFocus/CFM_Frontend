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
