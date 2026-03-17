import React from 'react';
import { Box, InputBase, IconButton, Theme, SxProps } from '@mui/material';
import {
  Search as SearchIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

interface SearchMapProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClose?: () => void;
  hideCloseIcon?: boolean; // Kept for backwards compatibility if used elsewhere
  sx?: SxProps<Theme>;
}

export function SearchMap({
  searchQuery,
  onSearchChange,
  sx = {},
}: SearchMapProps): React.ReactElement {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        zIndex: 1000,
        ...sx,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'rgba(0,0,0,0.1)',
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          width: '100%',
          maxWidth: 600,
          height: { xs: 52, md: 48 }, // Larger tap target on mobile
          transition: 'border-color 0.2s, box-shadow 0.2s',
          '&:focus-within': {
            borderColor: 'primary.main',
            boxShadow: '0 4px 16px rgba(21,67,212,0.15)',
          },
        }}
      >
        <SearchIcon
          sx={{ fontSize: { xs: 24, md: 20 }, color: 'text.secondary', mr: 1 }}
        />
        <InputBase
          placeholder="Search by name, street, or zip code..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{
            flex: 1,
            fontSize: { xs: '1.05rem', md: '1rem' },
            color: 'text.primary',
          }}
          inputProps={{
            'aria-label': 'Search for fridges',
          }}
          fullWidth
        />
        {searchQuery.length > 0 && (
          <IconButton
            aria-label="Clear search"
            onClick={() => onSearchChange('')}
            size="small"
            sx={{ color: 'text.secondary', p: { xs: 1, md: 0.5 } }}
          >
            <CancelIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
      <Box aria-live="polite" sx={{ display: 'none' }}>
        {searchQuery.length > 0 ? `Searching for ${searchQuery}` : ''}
      </Box>
    </Box>
  );
}

export default SearchMap;
