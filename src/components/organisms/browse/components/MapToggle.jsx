import PropTypes from 'prop-types';
import { IconButton, Typography } from '@mui/material';

export default function MapToggle({ currentView, setView }) {
  return (
    <IconButton
      onClick={() =>
        setView(
          currentView === MapToggle.view.map
            ? MapToggle.view.list
            : MapToggle.view.map
        )
      }
      sx={{ color: 'white' }}
    >
      <Typography sx={{ minWidth: '2.5rem' }}>
        {currentView === MapToggle.view.map ? 'List' : 'Map'}
      </Typography>
    </IconButton>
  );
}
MapToggle.propTypes = PropTypes.exact({
  currentView: PropTypes.symbol,
  setView: PropTypes.func,
}).isRequired;

MapToggle.view = Object.freeze({
  map: Symbol(0),
  list: Symbol(1),
});
