'use client';

import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { FridgeDetailsTab } from './FridgeDetailsTab';
import { FridgeActivityTab } from './FridgeActivityTab';
import { Fridge, FridgeReport } from 'types/domain';

interface FridgeTabsProps {
  fridge: Fridge;
  allReports: FridgeReport[];
}

export function FridgeTabs({
  fridge,
  allReports,
}: FridgeTabsProps): React.ReactElement {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* App-styled Blue Underline Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 5 }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="fridge details tabs"
          textColor="primary" // Reuses `primary.main` blue
          indicatorColor="primary"
          sx={{
            minHeight: 'auto',
            '& .MuiTabs-indicator': {
              height: 3, // Thicker indicator
              borderTopLeftRadius: 3,
              borderTopRightRadius: 3,
            },
            '& .MuiTab-root': {
              minHeight: 'auto',
              minWidth: 0,
              p: 0,
              mr: 6,
              pb: 2,
              fontWeight: 800,
              fontSize: '1.05rem',
              textTransform: 'none',
              color: 'text.secondary',
              opacity: 0.7,
              '&.Mui-selected': {
                color: 'primary.main',
                opacity: 1,
              },
              transition: 'opacity 0.2s',
            },
          }}
        >
          <Tab
            label="Activity Feed"
            id="tab-0"
            aria-controls="tabpanel-0"
            disableRipple
          />
          <Tab
            label="Details"
            id="tab-1"
            aria-controls="tabpanel-1"
            disableRipple
          />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <Box
        role="tabpanel"
        hidden={tabIndex !== 0}
        id="tabpanel-0"
        aria-labelledby="tab-0"
      >
        {tabIndex === 0 && (
          <FridgeActivityTab reports={allReports} fridge={fridge} />
        )}
      </Box>
      <Box
        role="tabpanel"
        hidden={tabIndex !== 1}
        id="tabpanel-1"
        aria-labelledby="tab-1"
      >
        {tabIndex === 1 && <FridgeDetailsTab fridge={fridge} />}
      </Box>
    </Box>
  );
}
