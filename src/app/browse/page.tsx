'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Typography, Divider } from '@mui/material';

import { FridgeList, SearchMap, useFridgeSearch } from 'features/fridge-list';
import {
  MapLegendPinLocationIcon,
  MapLegendConditionDirtyIcon,
  MapLegendConditionOutOfOrderIcon,
  MapLegendPinNotAtLocationIcon,
  MapLegendPinGhostIcon,
  MapLegendPinNoReportIcon,
} from 'theme/icons';
import { pinColor } from 'theme/palette';
import { Fridge } from 'types/domain';
import {
  MapToggle,
  MapView,
} from 'features/fridge-map/components/MapToggle/MapToggle';
import { useFridgeStore } from 'store/useFridgeStore';
import { useMapStore } from 'store/useMapStore';
import { StateBoundary } from 'components/shared/StateBoundary';
import { FridgeListSkeleton } from 'components/shared/skeletons/FridgeSkeletons';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ClickAwayListener,
} from '@mui/material';

const DynamicMap = dynamic(
  () => import('features/fridge-map').then((mod) => mod.MapContainer),
  { ssr: false, loading: () => <FridgeListSkeleton /> }
);

function FridgeMobileStatus({
  report,
}: {
  report: Fridge['report'];
}): React.ReactElement | null {
  if (!report) {
    return (
      <MapLegendPinNoReportIcon
        sx={{ width: 24, height: 24, color: pinColor.reportUnavailable }}
      />
    );
  }

  const { condition, foodPercentage } = report;

  if (condition === 'not at location') {
    return (
      <MapLegendPinNotAtLocationIcon
        sx={{ width: 24, height: 24, color: pinColor.fridgeNotAtLocation }}
      />
    );
  }

  if (condition === 'ghost') {
    return (
      <MapLegendPinGhostIcon
        sx={{ width: 24, height: 24, color: pinColor.fridgeGhost }}
      />
    );
  }

  const foodColors = [
    pinColor.itemsEmpty,
    pinColor.itemsFew,
    pinColor.itemsMany,
    pinColor.itemsFull,
  ];

  const foodColor = foodColors[foodPercentage] || foodColors[0];

  return (
    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
      <MapLegendPinLocationIcon
        sx={{ width: 24, height: 24, color: foodColor }}
      />
      {condition === 'dirty' && (
        <MapLegendConditionDirtyIcon
          sx={{ width: 24, height: 24, color: pinColor.fridgeOperation }}
        />
      )}
      {condition === 'out of order' && (
        <MapLegendConditionOutOfOrderIcon
          sx={{ width: 24, height: 24, color: pinColor.fridgeOperation }}
        />
      )}
    </Box>
  );
}

// Force DynamicMap to wrap in React.memo so it DOES NOT re-render
// every single time the user typing in the search box changes BrowsePage state.
const MemoizedMap = React.memo(DynamicMap);

export default function BrowsePage(): React.ReactElement {
  const { fridges, status, error, fetchFridges } = useFridgeStore();
  const setSelectedFridgeId = useMapStore((state) => state.setSelectedFridgeId);
  const [currentView, setCurrentView] = useState<MapView>('map');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {
    searchQuery,
    setSearchQuery,
    filteredFridges,
    mapFridges,
    isSearching,
  } = useFridgeSearch(fridges);

  useEffect(() => {
    fetchFridges();
  }, [fetchFridges]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: '100dvh',
        marginTop: '-64px', // Offset the appbar since this needs to be truly full screen
        paddingTop: '64px',
        position: 'relative',
        backgroundColor: 'background.paper',
      }}
    >
      {/* Mobile Floating Search Bar (Map View Only) */}
      {currentView === 'map' && (
        <ClickAwayListener onClickAway={() => setIsDropdownOpen(false)}>
          <Box
            sx={{
              display: { xs: 'block', md: 'none' },
              position: 'absolute',
              top: 80, // Sit below the AppBar
              left: 16,
              right: 16,
              zIndex: 1000,
            }}
          >
            <SearchMap
              searchQuery={searchQuery}
              onSearchChange={(val) => {
                setSearchQuery(val);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              hideCloseIcon
            />
            {searchQuery.length > 0 && isDropdownOpen && (
              <Box
                sx={{
                  mt: 1,
                  maxHeight: '50vh',
                  overflowY: 'auto',
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: 4,
                  border: '1px solid rgba(0,0,0,0.08)',
                  boxShadow: '0 12px 48px rgba(0,0,0,0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {isSearching ? (
                  <FridgeListSkeleton />
                ) : filteredFridges.length > 0 ? (
                  <List disablePadding>
                    {filteredFridges.map((fridge, i) => (
                      <ListItem disablePadding key={fridge.id}>
                        <ListItemButton
                          divider={i !== filteredFridges.length - 1}
                          onClick={() => {
                            setSelectedFridgeId(fridge.id);
                            setIsDropdownOpen(false); // Just hide dropdown, keep query
                          }}
                          sx={{
                            py: 2,
                            px: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2.5,
                          }}
                        >
                          <Box sx={{ flexShrink: 0 }}>
                            <FridgeMobileStatus report={fridge.report} />
                          </Box>
                          <ListItemText
                            primary={fridge.name}
                            primaryTypographyProps={{
                              variant: 'body1',
                              fontWeight: 800,
                              color: 'text.primary',
                              letterSpacing: '-0.02em',
                              fontSize: '1.1rem',
                            }}
                            secondary={`${fridge.location.street}, ${fridge.location.city}`}
                            secondaryTypographyProps={{
                              variant: 'body2',
                              color: 'text.secondary',
                              noWrap: true,
                              fontSize: '0.95rem',
                              mt: 0.5,
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Box sx={{ p: 4, textAlign: 'center' }}>
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      color="text.primary"
                      gutterBottom
                    >
                      No fridges found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Try searching for a different name or street
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </ClickAwayListener>
      )}

      {/* List Area */}
      <Box
        sx={{
          flex: 1,
          display: {
            xs: currentView === 'list' ? 'flex' : 'none',
            md: 'flex',
          },
          flexDirection: 'column',
          px: { xs: 0, md: 4 }, // No padding on mobile, flush to edges
          pt: { xs: 0, md: 2 },
          pb: 2,
          overflowY: 'hidden',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'block',
            pt: { xs: 2, md: 3 },
            px: { xs: 2, md: 0 },
            pb: 1,
            position: 'sticky',
            top: 0,
            backgroundColor: 'background.paper',
            zIndex: 10,
          }}
        >
          <Typography
            component="h1"
            sx={{
              display: { xs: 'none', md: 'block' },
              fontSize: '1.2rem',
              fontWeight: 800,
              color: 'text.primary',
              letterSpacing: '-0.02em',
              textAlign: 'center',
              mb: 3,
            }}
          >
            Fridges in this area
          </Typography>
          <SearchMap
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            hideCloseIcon
            sx={{ mb: { xs: 2, md: 3 } }}
          />
        </Box>
        <StateBoundary
          status={status}
          error={error}
          onRetry={fetchFridges}
          loadingView={<FridgeListSkeleton />}
        >
          <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 2, md: 0 } }}>
            {isSearching ? (
              <FridgeListSkeleton />
            ) : (
              <FridgeList
                fridges={filteredFridges}
                onFridgeSelect={(id) => {
                  setSelectedFridgeId(id);
                  setCurrentView('map');
                }}
              />
            )}
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
        <MemoizedMap fridges={mapFridges} onMarkerClick={setSelectedFridgeId} />
      </Box>

      {/* Map Toggle (Mobile Only) */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <MapToggle currentView={currentView} setView={setCurrentView} />
      </Box>
    </Box>
  );
}
