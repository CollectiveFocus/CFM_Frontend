import PropTypes from 'prop-types';

export const typeTag = PropTypes.string.isRequired;

export const fieldsLocation = {
  name: PropTypes.string,
  street: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  zip: PropTypes.string.isRequired,
  geoLat: PropTypes.number.isRequired,
  geoLng: PropTypes.number.isRequired,
};

export const fieldsMaintainer = {
  name: PropTypes.string,
  email: PropTypes.string,
  organization: PropTypes.string,
  phone: PropTypes.string,
  website: PropTypes.string,
  instagram: PropTypes.string,
};

export const fieldsFridge = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  location: PropTypes.exact(fieldsLocation).isRequired,
  tags: PropTypes.arrayOf(typeTag),
  maintainer: PropTypes.exact(fieldsMaintainer),
  photoUrl: PropTypes.string,
  notes: PropTypes.string,
  verified: PropTypes.bool,
};

export const typeCondition = PropTypes.oneOf([
  'good',
  'dirty',
  'out of order',
  'not at location',
  'ghost',
]);
export const typeFoodPercentage = PropTypes.oneOf([0, 1, 2, 3]);

export const fieldsReport = {
  timestamp: PropTypes.object.isRequired,
  condition: typeCondition.isRequired,
  foodPercentage: typeFoodPercentage.isRequired,
  photoUrl: PropTypes.string,
  notes: PropTypes.string,
};
