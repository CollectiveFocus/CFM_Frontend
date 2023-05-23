import PropTypes from 'prop-types';

export const typesPanel = {
  handleBack: PropTypes.func,
  handleNext: PropTypes.func,
};

export const typesPanelConfirm = {
  handleBack: PropTypes.func,
  handleNext: PropTypes.func,
  buttonTitle: PropTypes.string,
};

const typesValidation = {
  Panel: typesPanel,
  PanelConfirm: typesPanelConfirm,
};
export default typesValidation;
