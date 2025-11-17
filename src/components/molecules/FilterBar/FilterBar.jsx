import PropTypes from 'prop-types';
import { Chip, Stack } from '@mui/material';
import palette from 'theme/palette';
import { useFilterStore } from 'model/view/filterStore';
import { filterButtonConfig } from './filterButtonConfig';

/**
 * FilterBar component - Mobile filter buttons for map pins
 * Appears at the top of the screen and allows users to toggle pin categories
 */
export default function FilterBar() {
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
      {filterButtonConfig.map((config) => (
        <FilterPillButton
          key={config.filterType}
          filterType={config.filterType}
          icon={config.icon}
          text={config.text}
        />
      ))}
    </Stack>
  );
}

/**
 * FilterPillButton - Individual filter button with Zustand state management
 */
function FilterPillButton({ filterType, text, icon: IconComponent }) {
  const toggleFilter = useFilterStore((state) => state.toggleFilter);
  const isPillEnabled = useFilterStore((state) =>
    state.isFilterEnabled(filterType)
  );

  const handleClick = () => {
    toggleFilter(filterType);
  };

  const backgroundColor = isPillEnabled
    ? palette.pill.enabled
    : palette.pill.disabled;

  return (
    <Chip
      onClick={handleClick}
      icon={<IconComponent />}
      label={text}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: '1 0 auto',
        padding: '18px 0px',
        background: backgroundColor,
        border: '1px solid ' + palette.pill.border,
        boxShadow: '0px 4px 4px ' + palette.pill.shadow,
        borderRadius: '40px',
        whiteSpace: 'nowrap',
        '& .MuiChip-icon': {
          margin: 0,
          fontSize: '38px',
        },
        '& .MuiChip-label': {
          padding: 0,
          paddingRight: '10.5px',
          fontSize: '14px',
          textTransform: 'capitalize',
        },
        '&:hover': {
          background: backgroundColor,
          border: '1px solid ' + palette.pill.border,
        },
      }}
    />
  );
}

FilterPillButton.propTypes = {
  filterType: PropTypes.number.isRequired,
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
};
