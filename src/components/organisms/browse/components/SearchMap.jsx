import { useState } from 'react';
import { Box, InputBase, IconButton, Typography } from '@mui/material';
import {
  Search as SearchIcon,
  Cancel as CancelIcon,
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
        pl: 4,
        pr: 2,
        background: applyAlpha('cc', designColor.grayscale.gradient[5]),
      }}
    >
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
      <IconButton>
        <Typography sx={{ color: 'white' }}>List</Typography>
      </IconButton>
    </Box>
  );
}

const flexStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
