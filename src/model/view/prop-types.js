import PropTypes from 'prop-types';
import {
  fieldsFridge,
  fieldsLocation,
  fieldsReport,
} from 'model/data/fridge/prop-types';

export const typesLocation = PropTypes.exact(fieldsLocation);

export const typesFridge = PropTypes.exact({
  ...fieldsFridge,
  report: PropTypes.oneOf([
    PropTypes.exact(fieldsReport),
    PropTypes.instanceOf(null),
  ]),
});

export const typesGeolocation = PropTypes.exact({
  geoLat: PropTypes.number.isRequired,
  geoLng: PropTypes.number.isRequired,
});

const typesView = {
  Fridge: typesFridge,
  Location: typesLocation,
  Geolocation: typesGeolocation,
};
export default typesView;
