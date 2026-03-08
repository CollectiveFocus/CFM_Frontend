'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Typography, Divider, useMediaQuery, Theme } from '@mui/material';

import { FridgeList, SearchMap, useFridgeSearch } from 'features/fridge-list';
import { MapToggle, MapView } from 'components/atoms';
import { useWindowHeight } from 'hooks/useWindowHeight';
import { useFridgeStore } from 'store/useFridgeStore';
import { useMapStore } from 'store/useMapStore';
import { StateBoundary } from 'components/shared/StateBoundary';
import { FridgeListSkeleton } from 'components/shared/skeletons/FridgeSkeletons';

const DynamicMap = dynamic(
  () => import('features/fridge-map').then((mod) => mod.MapContainer),
  { ssr: false }
);

export default function BrowsePage(): React.ReactElement {
  const { fridges, status, error, fetchFridges } = useFridgeStore();
  const { selectedFridgeId, setSelectedFridgeId } = useMapStore();
  const [currentView, setCurrentView] = useState<MapView>('map');
  const [showSearchMap, setShowSearchMap] = useState(false);

  const { searchQuery, setSearchQuery, filteredFridges } =
    useFridgeSearch(fridges);

  const availableHeight = useWindowHeight();
  const isWindowDesktop = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('md')
  );

  useEffect(() => {
    fetchFridges();
  }, [fetchFridges]);

  const Map = (
    <Box sx={{ position: 'relative', height: '100%' }}>
      <DynamicMap
        fridges={filteredFridges}
        selectedFridgeId={selectedFridgeId}
        onMarkerClick={setSelectedFridgeId}
      />
      {showSearchMap && (
        <SearchMap
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClose={() => setShowSearchMap(false)}
        />
      )}
    </Box>
  );

  const List = (
    <>
      <FridgeList fridges={filteredFridges} />
    </>
  );

  function renderView(): React.ReactNode {
    if (isWindowDesktop) {
      return (
        <>
          <Box sx={{ flex: 1, overflow: 'scroll', px: 4 }}>
            <Typography variant="h4" sx={{ padding: '1em .5em .5em 0' }}>
              FRIDGES WITHIN THIS AREA
            </Typography>
            <Divider />
            <StateBoundary
              status={status}
              error={error}
              onRetry={fetchFridges}
              loadingView={<FridgeListSkeleton />}
            >
              {List}
            </StateBoundary>
          </Box>

          <Box sx={{ flex: 2.5 }}>{Map}</Box>
        </>
      );
    } else {
      return (
        <>
          {currentView === 'list' ? (
            <Box sx={{ flex: 1, px: 4 }}>
              <StateBoundary
                status={status}
                error={error}
                onRetry={fetchFridges}
                loadingView={<FridgeListSkeleton />}
              >
                {List}
              </StateBoundary>
            </Box>
          ) : (
            <Box sx={{ flex: 1 }}>{Map}</Box>
          )}

          <MapToggle currentView={currentView} setView={setCurrentView} />
        </>
      );
    }
  }

  return (
    <Box
      sx={{ display: 'flex', height: availableHeight || 'calc(100vh - 64px)' }}
    >
      {renderView()}
    </Box>
  );
}
