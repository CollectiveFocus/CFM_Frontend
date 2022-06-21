export function getInstagramHandleFromUrl(url) {
  return url.split('').splice(26).slice(0, -1).join('');
}

export function formatDate(isoString) {
  const msSinceEpoch = Date.parse(isoString);
  return new Date(msSinceEpoch).toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
}

export function makeLocationUrl(address) {
  return encodeURI(`https://www.google.com/maps/place/${address}`);
}
