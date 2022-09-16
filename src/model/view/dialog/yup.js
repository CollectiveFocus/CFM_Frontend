import apiFridge from 'model/data/fridge/yup.mjs';

export const dialogContact = apiFridge.Contact;

export const dialogLocation = apiFridge.Location.omit(['geoLat', 'geoLng']);

export const dialogFridge = apiFridge.Fridge.omit([
  'id',
  'verified',
  'tags',
  'location',
]).shape({
  location: dialogLocation.required(),
});

export const dialogReport = apiFridge.Report.omit(['timestamp']);

const dialogDataValidation = {
  Contact: dialogContact,
  Fridge: dialogFridge,
  Location: dialogLocation,
  Report: dialogReport,
};
export default dialogDataValidation;
