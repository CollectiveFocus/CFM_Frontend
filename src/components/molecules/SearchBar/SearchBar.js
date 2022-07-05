import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { Box, IconButton, Input, Paper, Stack } from '@mui/material';
import { ListItemText, ListItemButton } from '@mui/material';

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  mapMode,
  getUserLocation,
  filteredFridgeData,
  setSelectedFridge,
}) => {
  const mapModeStyles = {
    zIndex: 990,
    position: 'absolute',
    top: 20,
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '70%',
    maxWidth: 400,
    maxHeight: 200,
  };

  const listModeStyles = {
    position: 'fixed',
    top: 0,
    width: '100%',
    paddingLeft: 5,
    height: 50,
    borderRadius: 0,
    zIndex: 990,
    backgroundColor: '#fff',
    width: '100%',
  };

  const onSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const onClearQuery = () => {
    setSearchQuery('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onGetUserLocation = () => {
    getUserLocation();
  };

  const onSelectFridge = (fridge) => {
    setSelectedFridge(fridge);
  };

  const filterButtons =
    filteredFridgeData.length > 1 &&
    filteredFridgeData.map((fridge) => {
      return (
        <ListItemButton
          key={fridge.id}
          onClick={() => {
            onSelectFridge(fridge);
          }}
        >
          <ListItemText
            primaryTypographyProps={{
              fontSize: 14,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            primary={`${fridge.name}`}
            secondaryTypographyProps={{ fontSize: 14 }}
            secondary={
              fridge.distance
                ? `${fridge.borough} - ${
                    Math.round(fridge.distance * 100) / 100
                  } miles`
                : `${fridge.borough}`
            }
          />
        </ListItemButton>
      );
    });

  return (
    <form id="search-form">
      <Paper elevation={3} sx={mapMode ? mapModeStyles : listModeStyles}>
        <Stack elevation={3} flex={'column'}>
          <Box sx={{ display: 'flex', width: '100%', position: 'sticky' }}>
            <IconButton onSubmit={onSubmit} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Input
              id="search-query"
              onChange={onSearchChange}
              label="Find a fridge"
              size="small"
              placeholder="Find a fridge"
              value={searchQuery}
              disableUnderline
              sx={{ width: '90%' }}
            />
            {searchQuery != '' ? (
              <IconButton onClick={onClearQuery} aria-label="search">
                <ClearIcon />
              </IconButton>
            ) : (
              <IconButton
                onClick={onGetUserLocation}
                aria-label="user location"
              >
                <MyLocationIcon />
              </IconButton>
            )}
          </Box>
          {filteredFridgeData.length > 0 && (
            <Box sx={{ height: 150, overflow: 'scroll' }}>{filterButtons}</Box>
          )}
        </Stack>
      </Paper>
    </form>
  );
};

export default SearchBar;
