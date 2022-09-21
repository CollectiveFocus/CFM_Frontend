export function geolocation() {
  return new Promise((resolve, reject) => {
    if (location.protocol === 'https:' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position.coords) {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        } else {
          reject(new Error('browser did not return coordinates'));
        }
      });
    } else {
      reject(new Error('browser does not support geolocation api'));
    }
  });
}
