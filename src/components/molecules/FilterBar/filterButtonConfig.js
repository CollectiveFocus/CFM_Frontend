import {
  MapLegendConditionDirtyIcon,
  MapLegendConditionOutOfOrderIcon,
  MapLegendPinLocationIcon,
  MapLegendPinNotAtLocationIcon,
  MapLegendPinNoReportIcon,
  MapLegendPinGhostIcon,
} from 'theme/icons';
import { pinColor } from 'theme/palette';
import { enumFilter } from 'model/view/enums';

const createColoredIcon = (icon, fillColor) => (props) =>
  icon({ ...props, ...{ sx: { fill: fillColor } } });
/**
 * Configuration for each filter button
 * Centralizes button display properties and maps to filter enum
 */
export const filterButtonConfig = [
  {
    filterType: enumFilter.ITEMS_FULL,
    text: 'Full',
    icon: createColoredIcon(MapLegendPinLocationIcon, pinColor.itemsFull),
    defaultSelected: true,
  },
  {
    filterType: enumFilter.ITEMS_MANY,
    text: 'Many Items',
    icon: createColoredIcon(MapLegendPinLocationIcon, pinColor.itemsMany),
    defaultSelected: true,
  },
  {
    filterType: enumFilter.ITEMS_FEW,
    text: 'Few Items',
    icon: createColoredIcon(MapLegendPinLocationIcon, pinColor.itemsFew),
    defaultSelected: true,
  },
  {
    filterType: enumFilter.ITEMS_EMPTY,
    text: 'Empty',
    icon: createColoredIcon(MapLegendPinLocationIcon, pinColor.itemsEmpty),
    defaultSelected: true,
  },
  {
    filterType: enumFilter.NO_REPORT,
    text: 'No Report',
    icon: createColoredIcon(
      MapLegendPinNoReportIcon,
      pinColor.fridgeNotAtLocation
    ),
    defaultSelected: true,
  },
  {
    filterType: enumFilter.NOT_AT_LOCATION,
    text: 'Not at Location',
    icon: createColoredIcon(
      MapLegendPinNotAtLocationIcon,
      pinColor.reportUnavailable
    ),
    defaultSelected: false,
  },
  {
    filterType: enumFilter.NEEDS_CLEANING,
    text: 'Needs Cleaning',
    icon: createColoredIcon(
      MapLegendConditionDirtyIcon,
      pinColor.fridgeOperation
    ),
    defaultSelected: true,
  },
  {
    filterType: enumFilter.NEEDS_REPAIRS,
    text: 'Needs Repairs',
    icon: createColoredIcon(
      MapLegendConditionOutOfOrderIcon,
      pinColor.fridgeOperation
    ),
    defaultSelected: true,
  },
  {
    filterType: enumFilter.PERMANENTLY_CLOSED,
    text: 'Ghost Fridge',
    icon: createColoredIcon(MapLegendPinGhostIcon, pinColor.fridgeGhost),
    defaultSelected: false,
  },
];
