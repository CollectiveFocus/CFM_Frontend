import { object, string, array, number, boolean } from 'Yup';

const Tag = string().max(140).trim().required();
const Tags = array().of(Tag).nullable();

const Location = object().shape({
  street: string().max(55).trim().required(),
  city: string().max(35).trim().required(),
  state: string().length(2).uppercase().required(),
  zip: string()
    .matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/)
    .required(),
});

const Maintainer = object()
  .nullable()
  .shape({
    name: string().max(70).trim().required(),
    email: string().email().required(),
    organization: string().max(80).trim().optional(),
    phone: string()
      .matches(/\(\d{3}\) \d{3}-\d{4}/)
      .optional(),
    website: string().url().optional(),
    instagram: string().url().optional(),
  });

const Report = object()
  .nullable()
  .shape({
    condition: string()
      .oneOf(['good', 'dirty', 'out of order', 'not at location'])
      .optional(),
    foodPercentage: number().integer().oneOf([0, 33, 66, 100]),
    foodPhotoURL: string().url().optional(),
    notes: string().min(0).max(300).trim().default('').optional(),
  });

const FridgeApiSchema = object().shape({
  id: string().min(4).max(60).required(),
  name: string().min(4).max(60).trim().required(),
  location: Location.required(),
  tags: Tags.default(null),
  maintainer: Maintainer.default(null),
  notes: string().min(0).max(300).trim().default(''),
  photoURL: string().url().optional(),
  verified: boolean().default(false),
});
const  FridgeDialogSchema = FridgeApiSchema.omit(['id', 'verified', 'tags']);

export default { FridgeDialogSchema, ReportDialogSchema: Report };
