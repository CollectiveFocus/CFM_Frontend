import React from 'react';
import dynamic from 'next/dynamic';

export default function FridgeMap() {
  const DynamicMap = dynamic(
    () => {
      return import('../../components/organisms/FridgeMap/FridgeMapComponent');
    },
    { ssr: false }
  );
  return (
    <div style={{ height: '100vh' }}>
      <DynamicMap style={{ height: '100vh' }} />
    </div>
  );
}
