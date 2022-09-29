import PropTypes from 'prop-types';
import typesDataFridge from 'model/data/fridge/prop-types';

export const typesReportCondition = PropTypes.oneOf([
  'good',
  'dirty',
  'out of order',
  'not at location',
  'ghost',
]);

export const typesReport = {
  ...typesDataFridge.Report,
  condition: typesReportCondition,
};

export const typesFridge = PropTypes.exact({
  ...typesDataFridge.Fridge,
  report: typesReport,
});

export const typesGeolocation = PropTypes.exact({
  geoLat: PropTypes.number.isRequired,
  geoLng: PropTypes.number.isRequired,
});

const typesView = {
  Fridge: typesFridge,
  Geolocation: typesGeolocation,
};
export default typesView;
