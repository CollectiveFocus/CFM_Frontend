import React from 'react';
import { Box, InputBase, IconButton, Theme, SxProps } from '@mui/material';
import {
  Search as SearchIcon,
  Cancel as CancelIcon,
  ArrowBackIosNew as ArrowBackIcon,
} from '@mui/icons-material';

interface SearchMapProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClose: () => void;
  hideCloseIcon?: boolean;
  sx?: SxProps<Theme>;
}

export function SearchMap({
  searchQuery,
  onSearchChange,
  onClose,
  hideCloseIcon = false,
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
        backgroundColor: hideCloseIcon ? 'transparent' : 'rgba(0,0,0,0.85)',
        position: hideCloseIcon ? 'static' : 'absolute',
        bottom: hideCloseIcon ? 'auto' : 0,
        left: 0,
        px: hideCloseIcon ? 0 : 2,
        py: hideCloseIcon ? 0 : 2,
        zIndex: 1000,
        ...sx,
      }}
    >
      {!hideCloseIcon && (
        <IconButton
          aria-label="close-search"
          onClick={onClose}
          sx={{ mr: 1, color: 'white' }}
        >
          <ArrowBackIcon />
        </IconButton>
      )}
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          backgroundColor: hideCloseIcon
            ? 'rgba(0,0,0,0.04)'
            : 'background.paper',
          border: hideCloseIcon ? 'none' : '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          width: '100%',
          maxWidth: 600,
          height: 48,
          transition: 'border-color 0.2s, background-color 0.2s',
          '&:focus-within': {
            backgroundColor: hideCloseIcon
              ? 'rgba(0,0,0,0.06)'
              : 'background.paper',
          },
        }}
      >
        <SearchIcon sx={{ fontSize: 20, color: 'text.secondary', mr: 1 }} />
        <InputBase
          placeholder="Search by name, street, or zip code..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{ flex: 1, fontSize: '0.95rem' }}
          fullWidth
        />
        {searchQuery.length > 0 && (
          <IconButton
            aria-label="clear-search"
            onClick={() => onSearchChange('')}
            size="small"
            sx={{ color: 'text.secondary' }}
          >
            <CancelIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

export default SearchMap;
