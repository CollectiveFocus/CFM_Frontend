import PropTypes from 'prop-types';

export const typesPanel = PropTypes.exact({
  handleBack: PropTypes.func,
  handleNext: PropTypes.func,
});

export const typesPanelConfirm = PropTypes.exact({
  handleBack: PropTypes.func,
  handleNext: PropTypes.func,
  buttonTitle: PropTypes.string,
});

const typesValidation = {
  Panel: typesPanel,
  PanelConfirm: typesPanelConfirm,
};
export default typesValidation;
