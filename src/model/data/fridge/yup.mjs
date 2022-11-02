import { array, boolean, date, number, object, string } from 'yup';

// fridge database records
export const ValuesTag = string().max(140).trim().required();
export const ValuesTags = array().of(ValuesTag).nullable();

export const ValuesLocation = object({
  name: string().max(70).trim().optional(),
  street: string().max(55).trim().required(),
  city: string().max(35).trim().required(),
  state: string().length(2).uppercase().required(),
  zip: string()
    .matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/)
    .required(),
  geoLat: number().required(),
  geoLng: number().required(),
});

export const ValuesMaintainer = object({
  name: string().max(70).trim().optional(),
  email: string().email().lowercase().optional(),
  organization: string().max(80).trim().optional(),
  phone: string()
    .matches(/^\(\d{3}\) \d{3}-\d{4}$/)
    .optional(),
  website: string().url().optional(),
  instagram: string().url().optional(),
}).nullable();

export const ValuesFridge = object({
  id: string().min(4).max(60).required(),
  name: string().min(4).max(60).trim().required(),
  location: ValuesLocation.required(),
  tags: ValuesTag.optional(),
  maintainer: ValuesMaintainer.optional(),
  photoUrl: string().url().optional(),
  notes: string().min(1).max(700).trim().optional(),
  verified: boolean().default(false),
});

export const ValuesReport = object({
  timestamp: date().required(),
  condition: string()
    .oneOf(['good', 'dirty', 'out of order', 'not at location'])
    .required(),
  foodPercentage: number().integer().oneOf([0, 33, 67, 100]).required(),
  photoUrl: string().url().optional(),
  notes: string().min(0).max(300).trim().optional(),
});

// website contact form data
export const ValuesContact = object({
  name: string().max(70).trim().required(),
  email: string().email().required(),
  subject: string().max(70).trim().required(),
  message: string().max(2048).trim().required(),
});

const valuesDataFridge = {
  Contact: ValuesContact,
  Fridge: ValuesFridge,
  Location: ValuesLocation,
  Report: ValuesReport,
  Tag: ValuesTag,
  Tags: ValuesTags,
};
export default valuesDataFridge;
