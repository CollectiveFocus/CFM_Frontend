import { array, boolean, date, number, object, string } from 'Yup';

const Tag = string().max(140).trim().required();
const Tags = array().of(Tag).nullable();

const Location = object({
  street: string().max(55).trim().required(),
  city: string().max(35).trim().required(),
  state: string().length(2).uppercase().required(),
  zip: string()
    .matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/)
    .required(),
  geoLat: number().required(),
  geoLng: number().required(),
});

const Maintainer = object({
  name: string().max(70).trim().required(),
  email: string().email().required(),
  organization: string().max(80).trim().optional(),
  phone: string()
    .matches(/^\(\d{3}\) \d{3}-\d{4}$/)
    .optional(),
  website: string().url().optional(),
  instagram: string().url().optional(),
}).nullable();

const Fridge = object({
  id: string().min(4).max(60).required(),
  name: string().min(4).max(60).trim().required(),
  location: Location.required(),
  tags: Tags.optional(),
  maintainer: Maintainer.optional(),
  photoURL: string().url().optional(),
  notes: string().min(1).max(300).trim().optional(),
  verified: boolean().default(false),
});

const Report = object({
  timestamp: date().required(),
  condition: string()
    .oneOf(['good', 'dirty', 'out of order', 'not at location'])
    .required(),
  foodPercentage: number().integer().oneOf([0, 33, 66, 100]).required(),
  photoURL: string().url().optional(),
  notes: string().min(0).max(300).trim().optional(),
});

const API = { Fridge, Report, Location };
export default API;
