import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import {
  MapOutlined as MapIcon,
  FormatListBulletedOutlined as ListIcon,
} from '@mui/icons-material';

export default function MapToggle({ currentView, setView }) {
  return (
    <Button
      fullWidth
      startIcon={
        currentView === MapToggle.view.map ? <ListIcon /> : <MapIcon />
      }
      sx={{
        position: 'fixed',
        bottom: 0,
        zIndex: 999,
        height: 60,
        backgroundColor: '#fff',
        border: 'none',
        borderRadius: 3,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        boxShadow: '-2px 0px 4px rgb(0 0 0 / 20%)',
        justifyContent: 'left',
        padding: 5,
        fontWeight: 500,
        textTransform: 'none',
        ':hover': { backgroundColor: '#fff' },
      }}
      onClick={() =>
        setView(
          currentView === MapToggle.view.map
            ? MapToggle.view.list
            : MapToggle.view.map
        )
      }
    >
      {currentView === MapToggle.view.map ? 'List View' : 'Map View'}
    </Button>
  );
}
MapToggle.propTypes = {
  currentView: PropTypes.symbol,
  setView: PropTypes.func,
};

MapToggle.view = Object.freeze({
  map: Symbol(0),
  list: Symbol(1),
});
