import { useState } from 'react';
import { Box, InputBase, IconButton } from '@mui/material';
import {
  Search as SearchIcon,
  Cancel as CancelIcon,
  ArrowBackIosNew as ArrowBackIcon,
} from '@mui/icons-material';

import { applyAlpha, designColor } from 'theme/palette';

export default function SearchMap() {
  const [searchQuery, setSearchQuery] = useState('');

  function handleSearch(e) {
    e.preventDefault();
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '2.5em',
        ...flexStyles,
        pr: 3,
        background: applyAlpha('cc', designColor.grayscale.gradient[5]),
      }}
    >
      <IconButton
        aria-label="close-search"
        onClick={() => setShowSearchMap(false)}
      >
        <ArrowBackIcon sx={{ color: 'white' }} />
      </IconButton>
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
          px: 4,
        }}
      >
        <SearchIcon sx={{ fontSize: 25 }} />
        <InputBase
          placeholder="Fridge names, locations, etc."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mx: 1 }}
          fullWidth
        />
        {searchQuery.length > 0 && (
          <IconButton
            aria-label="clear-search"
            onClick={() => setSearchQuery('')}
            sx={{ p: '5px' }}
          >
            <CancelIcon sx={{ fontSize: 25 }} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

const flexStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
