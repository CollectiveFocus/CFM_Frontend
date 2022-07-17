import CFM from 'schema/api/cfm';

const dialogLocation = CFM.Location.omit(['geoLat', 'geoLng']);

const Fridge = CFM.Fridge.omit(['id', 'verified', 'tags', 'location']).shape({
  location: dialogLocation.required(),
});

const Report = CFM.Report.omit(['timestamp']);

const dialog = { Fridge, Report };
export default dialog;
