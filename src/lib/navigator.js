import { useState, useEffect } from 'react';

export function useWindowHeight() {
  const [availableHeight, setAvailableHeight] = useState(0);
  const calculateAvailableHeight = () =>
    window.innerHeight - document.getElementById('AppBar').offsetHeight;

  useEffect(() => {
    function handleResize() {
      setAvailableHeight(calculateAvailableHeight());
    }

    setAvailableHeight(calculateAvailableHeight());

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return availableHeight;
}

export function geolocation() {
  return new Promise((resolve, reject) => {
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position.coords) {
          resolve({
            geoLat: position.coords.latitude,
            geoLng: position.coords.longitude,
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
