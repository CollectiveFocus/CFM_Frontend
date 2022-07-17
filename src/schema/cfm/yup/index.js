import { object, string, oneOf, array } from 'Yup';

const Tag = string().max(140).trim().required();

const Fridge = object().shape({
  id: string().min(5).max(60).required(),
  name: string().min(5).max(60).trim().required(),
  location: Location.required(),
  tags: array().of(Tag).optional(),
  maintainer: Maintainer.optional(),
  notes: string().min(0).max(300).trim().default('').optional(),
  photoURL: string().url().optional(),
});
const Location = object().shape({
  street: string().max(55).trim().required(),
  city: string().max(35).trim().required(),
  state: string().length(2).uppercase().required(),
  zip: string()
    .matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/)
    .required(),
});
const Maintainer = object().shape({
  name: string().max(70).trim().required(),
  email: string().email().required(),
  organization: string().max(80).trim().optional(),
  phone: string()
    .matches(/\(\d{3}\) \d{3}-\d{4}/)
    .optional(),
  website: string().url().optional(),
  instagram: string().url().optional(),
});
const Report = object().shape({
  condition: oneOf(['dirty', 'out of order', 'not at location']).nullable(),
  foodPercentage: oneOf([0, 25, 50, 75, 100]),
  foodPhotoURL: string().url().optional(),
  notes: string().min(0).max(300).trim().default('').optional(),
});

export { Fridge as FridgeDialogSchema, Report as ReportDialogSchema };
