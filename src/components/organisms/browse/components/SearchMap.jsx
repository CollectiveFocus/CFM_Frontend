import PropTypes from 'prop-types';
import { useState } from 'react';
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

export default function SearchMap({ setShowSearchMap }) {
  const [searchQuery, setSearchQuery] = useState('');

  function handleSearch(e) {
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
SearchMap.propTypes = {
  setShowSearchMap: PropTypes.func,
};
