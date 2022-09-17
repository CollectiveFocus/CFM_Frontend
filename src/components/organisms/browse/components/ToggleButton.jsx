import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import {
  MapOutlined as MapIcon,
  FormatListBulletedOutlined as ListIcon,
} from '@mui/icons-material';

export default function ToggleButton({ mode }) {
  return (
    <Button
      fullWidth
      startIcon={mode === ToggleButton.Mode.List ? <ListIcon /> : <MapIcon />}
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
    >
      {mode === ToggleButton.Mode.List ? 'List View' : 'Map View'}
    </Button>
  );
}
ToggleButton.propTypes = PropTypes.exact({
  mode: PropTypes.symbol,
}).isRequired;

ToggleButton.Mode = Object.freeze({
  Map: Symbol(0),
  List: Symbol(1),
});
