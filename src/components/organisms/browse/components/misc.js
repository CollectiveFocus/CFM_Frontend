import { useState, useEffect } from 'react';

function calculateAvailableHeight() {
  const appBarHeight = document.getElementById('AppBar').offsetHeight;

  return window.innerHeight - appBarHeight;
}

export function useAvailableHeight() {
  const [availableHeight, setAvailableHeight] = useState(0);

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
