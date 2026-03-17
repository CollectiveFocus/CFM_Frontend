'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Typography, Divider, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

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
import { useWindowHeight } from 'hooks/useWindowHeight';
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
  { ssr: false }
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

export default function BrowsePage(): React.ReactElement {
  const { fridges, status, error, fetchFridges } = useFridgeStore();
  const { selectedFridgeId, setSelectedFridgeId } = useMapStore();
  const [currentView, setCurrentView] = useState<MapView>('map');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
        height: availableHeight || '100dvh', // Use 100dvh for better mobile Safari handling
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
                  maxHeight: '40vh',
                  overflowY: 'auto',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: 3,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {filteredFridges.length > 0 ? (
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
                            py: 1.5,
                            px: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
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
                            }}
                            secondary={`${fridge.location.street}, ${fridge.location.city}`}
                            secondaryTypographyProps={{
                              variant: 'body2',
                              color: 'text.secondary',
                              noWrap: true,
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      No fridges found.
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
            pt: { xs: 2, md: 2 },
            px: { xs: 2, md: 0 },
            pb: 1,
          }}
        >
          <Typography
            variant="overline"
            sx={{
              display: { xs: 'none', md: 'block' },
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
            hideCloseIcon
            sx={{ mb: { xs: 2, md: 3 } }}
          />
          <Divider sx={{ mb: 2, display: { xs: 'none', md: 'block' } }} />
        </Box>
        <StateBoundary
          status={status}
          error={error}
          onRetry={fetchFridges}
          loadingView={<FridgeListSkeleton />}
        >
          <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 2, md: 0 } }}>
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
      </Box>

      {/* Map Toggle (Mobile Only) */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <MapToggle currentView={currentView} setView={setCurrentView} />
      </Box>
    </Box>
  );
}
