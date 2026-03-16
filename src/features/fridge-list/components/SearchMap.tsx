import React from 'react';
import { Box, InputBase, IconButton } from '@mui/material';
import {
  Search as SearchIcon,
  Cancel as CancelIcon,
  ArrowBackIosNew as ArrowBackIcon,
} from '@mui/icons-material';

import { applyAlpha, designColor } from 'theme/palette';

const flexStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  px: 3,
};

interface SearchMapProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClose: () => void;
  hideCloseIcon?: boolean;
}

export function SearchMap({
  searchQuery,
  onSearchChange,
  onClose,
  hideCloseIcon = false,
  sx = {},
}: SearchMapProps & {
  sx?: import('@mui/material').SxProps<import('@mui/material').Theme>;
}): React.ReactElement {
  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '2.5em',
        position: 'absolute',
        bottom: '-2.5em',
        left: 0,
        ...flexStyles,
        background: applyAlpha('cc', designColor.neroGray),
        zIndex: 1000, // Ensure it's above the map
        ...sx,
      }}
    >
      {!hideCloseIcon && (
        <IconButton aria-label="close-search" onClick={onClose}>
          <ArrowBackIcon sx={{ color: 'white' }} />
        </IconButton>
      )}
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          ...flexStyles,
          backgroundColor: 'background.default',
          borderRadius: 8,
          width: '100%',
          maxWidth: 600,
          height: '1.9em',
        }}
      >
        <SearchIcon sx={{ fontSize: 25 }} />
        <InputBase
          placeholder="Fridge names, locations, etc."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{ mx: 1 }}
          fullWidth
        />
        {searchQuery.length > 0 && (
          <IconButton
            aria-label="clear-search"
            onClick={() => onSearchChange('')}
            sx={{ p: '5px' }}
          >
            <CancelIcon sx={{ fontSize: 25 }} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

export default SearchMap;
