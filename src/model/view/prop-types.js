import PropTypes from 'prop-types';
import {
  fieldsFridge as fieldsFridge_dm,
  fieldsLocation,
  fieldsReport,
} from 'model/data/fridge/prop-types';

const typesLocation = PropTypes.exact(fieldsLocation);
const typesReport = PropTypes.exact(fieldsReport);

const fieldsFridge = {
  ...fieldsFridge_dm,
  report: typesReport,
};
const typesFridge = PropTypes.exact(fieldsFridge);

const viewValidator = {
  fields: {
    fridge: fieldsFridge,
    report: fieldsReport,
  },
  Fridge: typesFridge,
  Report: typesReport,
  Location: typesLocation,
};

export default viewValidator;
