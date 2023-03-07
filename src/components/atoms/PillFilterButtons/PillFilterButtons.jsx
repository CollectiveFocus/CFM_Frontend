import PropTypes from 'prop-types';
import { Chip, Stack } from '@mui/material';
import { useState } from 'react';
import {
  MapLegendConditionDirtyIcon,
  MapLegendConditionOutOfOrderIcon,
  MapLegendPinLocationIcon,
  MapLegendPinNotAtLocationIcon,
  MapLegendPinNoReportIcon,
  MapLegendPinGhostIcon,
} from 'theme/icons';
import { pinColor } from 'theme/palette';

// These buttons appear on mobile at the top of the screen when the user is viewing the map. They add or remove map pins based on their categories.
export default function PillFilterButtons() {
  const buttons = [
    {
      text: 'Full',
      iconColor: pinColor.itemsFull,
      icon: <MapLegendPinLocationIcon />,
    },
    {
      text: 'Many Items',
      iconColor: pinColor.itemsMany,
      icon: <MapLegendPinLocationIcon />,
    },
    {
      text: 'Few Items',
      iconColor: pinColor.itemsFew,
      icon: <MapLegendPinLocationIcon />,
    },
    {
      text: 'Empty ',
      iconColor: pinColor.itemsEmpty,
      icon: <MapLegendPinLocationIcon />,
    },
    {
      text: 'No Data Yet',
      iconColor: pinColor.fridgeNotAtLocation,
      icon: <MapLegendPinNoReportIcon />,
    },
    {
      text: 'Unavailable',
      iconColor: pinColor.reportUnavailable,
      icon: <MapLegendPinNotAtLocationIcon />,
    },
    {
      text: 'Needs Cleaning',
      iconColor: pinColor.fridgeOperation,
      icon: <MapLegendConditionDirtyIcon />,
    },
    {
      text: 'Needs Servicing',
      iconColor: pinColor.fridgeOperation,
      icon: <MapLegendConditionOutOfOrderIcon />,
    },
    {
      text: 'Ghost Fridge',
      iconColor: pinColor.fridgeGhost,
      icon: <MapLegendPinGhostIcon />,
    },
  ];

  const setDefaultSelections = (button) => {
    if (button.text === 'Ghost Fridge' || button.text === 'Unavailable') {
      return false;
    }
    return true;
  };

  return (
    <Stack
      direction="row"
      spacing={1.5}
      style={{
        position: 'fixed',
        left: '50px',
        top: '61px',
        width: '100%',
        padding: '13px 0px',
        paddingRight: '67px',
        overflowX: 'auto',
        zIndex: 410,
      }}
    >
      {buttons.map((button, index) => (
        <PillFilterButton
          key={button.text + index}
          icon={button.icon}
          iconColor={button.iconColor}
          text={button.text}
          defaultIsSelected={setDefaultSelections(button)}
        />
      ))}
    </Stack>
  );
}

const PillFilterButton = ({ icon, text, iconColor, defaultIsSelected }) => {
  const [isSelected, setIsSelected] = useState(defaultIsSelected);

  const getBackgroundColor = () => {
    if (isSelected === true) {
      return '#fff';
    }
    return '#D8D8D8';
  };

  const handleClick = () => {
    setIsSelected((previousState) => !previousState);
    // TODO Add filter map function call here -- Sean
  };

  return (
    <Chip
      onClick={handleClick}
      icon={icon}
      label={text}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: '1 0 auto',
        padding: '18px 0px',
        background: `${getBackgroundColor()}`,
        border: '1px solid #F3F3F3',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.4);',
        borderRadius: '40px',
        whiteSpace: 'nowrap',
        '& .MuiChip-icon': {
          color: iconColor,
          margin: 0,
          fontSize: '38px',
        },
        '& .MuiChip-label': {
          padding: 0,
          paddingRight: '10.5px',
          margin: '0',
          padding: '0',
          fontSize: '14px',
          textTransform: 'Capitalize',
        },
        '&:hover': {
          background: `${getBackgroundColor()}`,
          border: '1px solid #F3F3F3',
        },
      }}
    />
  );
};
PillFilterButton.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  defaultIsSelected: PropTypes.bool.isRequired,
};
