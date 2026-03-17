'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Typography, Divider, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

import { FridgeList, SearchMap, useFridgeSearch } from 'features/fridge-list';
import { MapToggle, MapView } from 'features/fridge-map/components/MapToggle/MapToggle';
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

  useEffect(() => {
    fetchFridges();
  }, [fetchFridges]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: availableHeight || 'calc(100vh - 64px)',
      }}
    >
      {/* List Area */}
      <Box
        sx={{
          flex: 1,
          display: {
            xs: currentView === 'list' ? 'flex' : 'none',
            md: 'flex',
          },
          flexDirection: 'column',
          px: { xs: 2, md: 4 },
          py: 2,
          overflowY: 'hidden',
          height: '100%',
        }}
      >
        <Box sx={{ display: { xs: 'none', md: 'block' }, pt: 2, pb: 1 }}>
          <Typography
            variant="overline"
            sx={{
              display: 'block',
              fontSize: '0.85rem',
              letterSpacing: 1.5,
              fontWeight: 600,
              color: 'text.secondary',
              mb: 1,
            }}
          >
            FRIDGES WITHIN THIS AREA
          </Typography>
          <SearchMap
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClose={() => {}} // Desktop search stays open
            hideCloseIcon
            sx={{ mb: 3 }}
          />
          <Divider sx={{ mb: 2 }} />
        </Box>
        <StateBoundary
          status={status}
          error={error}
          onRetry={fetchFridges}
          loadingView={<FridgeListSkeleton />}
        >
          <Box sx={{ flex: 1, overflowY: 'auto' }}>
            <FridgeList fridges={filteredFridges} />
          </Box>
        </StateBoundary>
      </Box>

      {/* Map Area */}
      <Box
        sx={{
          flex: { xs: 1, md: 2.5 },
          display: {
            xs: currentView === 'map' ? 'block' : 'none',
            md: 'block',
          },
          position: 'relative',
          height: '100%',
        }}
      >
        <DynamicMap
          fridges={filteredFridges}
          selectedFridgeId={selectedFridgeId}
          onMarkerClick={setSelectedFridgeId}
        />
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          {!showSearchMap && (
            <IconButton
              onClick={() => setShowSearchMap(true)}
              sx={{
                position: 'absolute',
                bottom: { xs: 80, md: 16 }, // avoid overlap with MapToggle
                right: 16,
                backgroundColor: 'secondary.main',
                color: 'white',
                '&:hover': { backgroundColor: 'secondary.dark' },
                zIndex: 1000,
              }}
            >
              <SearchIcon />
            </IconButton>
          )}
          {showSearchMap && (
            <SearchMap
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onClose={() => setShowSearchMap(false)}
            />
          )}
        </Box>
      </Box>

      {/* Map Toggle (Mobile Only) */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <MapToggle currentView={currentView} setView={setCurrentView} />
      </Box>
    </Box>
  );
}
