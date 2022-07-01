import SearchIcon from '@mui/icons-material/Search';
import { IconButton, Input, Paper } from '@mui/material';

const SearchBar = ({ setSearchQuery, mapMode }) => {
  const mapModeStyles = {
    display: 'flex',
    alignItems: 'flex-end',
    zIndex: 990,
    position: 'absolute',
    top: 20,
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '70%',
    maxWidth: 400,
  };
  const listModeStyles = {
    position: 'fixed',
    top: 0,
    display: 'flex',
    alignItems: 'flex-end',
    zIndex: 990,
    backgroundColor: '#fff',
    width: '100%',
    paddingLeft: 5,
    height: 50,
    borderRadius: 0,
  };

  const onSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    // setBounds();
  };
  return (
    <form id="search-form">
      <Paper elevation={3} sx={mapMode ? mapModeStyles : listModeStyles}>
        <IconButton type="submit" onSubmit={onSubmit} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Input
          id="search-query"
          onChange={onSearchChange}
          label="Find a fridge"
          size="small"
          placeholder="Find a fridge"
          disableUnderline
        />
      </Paper>
    </form>
  );
};

export default SearchBar;
