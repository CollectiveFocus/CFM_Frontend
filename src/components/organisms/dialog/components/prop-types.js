import PropTypes from 'prop-types';

export const typesPanel = PropTypes.exact({
  handleBack: PropTypes.func,
  handleNext: PropTypes.func,
});

const typesValidation = {
  Panel: typesPanel,
};
export default typesValidation;
