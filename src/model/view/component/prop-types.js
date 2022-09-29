import PropTypes from 'prop-types';

/**
 * next/image props
 *
 * From https://nextjs.org/docs/api-reference/next/image
 * By https://github.com/bernardm
 */
export const typesNextImage = PropTypes.exact({
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  layout: PropTypes.oneOf(['intrinsic ', 'fixed', 'responsive', 'fill']),
});

/**
 * Formik props
 *
 * From https://jaredpalmer.com/formik/docs/api/formik#formik-render-methods-and-props
 * By https://github.com/ClementParis016
 */
export const typesFormik = PropTypes.exact({
  dirty: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  isValidating: PropTypes.bool.isRequired,
  resetForm: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  setFieldError: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  submitCount: PropTypes.number.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  setSubmitting: PropTypes.func.isRequired,
  setTouched: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  status: PropTypes.any,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  validateForm: PropTypes.func.isRequired,
  validateField: PropTypes.func.isRequired,
});

const typesViewComponent = {
  Formik: typesFormik,
  NextImage: typesNextImage,
};
export default typesViewComponent;
