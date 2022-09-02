import PropTypes from 'prop-types';

export const typesTag = PropTypes.string.isRequired;
export const typesTags = PropTypes.arrayOf(typesTag);

export const typesLocation = PropTypes.exact({
  name: PropTypes.string,
  street: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  zip: PropTypes.string.isRequired,
  geoLat: PropTypes.number.isRequired,
  geoLng: PropTypes.number.isRequired,
});

export const typesMaintainer = PropTypes.exact({
  name: PropTypes.string,
  email: PropTypes.string,
  organization: PropTypes.string,
  phone: PropTypes.string,
  website: PropTypes.string,
  instagram: PropTypes.string,
});

export const typesFridge = PropTypes.exact({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  location: typesLocation.isRequired,
  tags: typesTags,
  maintainer: typesMaintainer,
  photoUrl: PropTypes.string,
  notes: PropTypes.string,
  verified: PropTypes.bool,
});

export const typesReportCondition = PropTypes.oneOf([
  'good',
  'dirty',
  'out of order',
  'not at location',
]);
export const typesReport = PropTypes.shape({
  timestamp: PropTypes.string.isRequired,
  condition: typesReportCondition.isRequired,
  foodPercentage: PropTypes.oneOf([0, 33, 67, 100]).isRequired,
  photoUrl: PropTypes.string,
  notes: PropTypes.string,
});

const typesValidation = {
  Fridge: typesFridge,
  Location: typesLocation,
  Maintainer: typesMaintainer,
  Report: typesReport,
  ReportCondition: typesReportCondition,
  Tag: typesTag,
  Tags: typesTags,
};
export default typesValidation;
