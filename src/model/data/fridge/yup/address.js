import { object as yupObject, string, number } from 'yup';

export default Object.freeze({
  // Argentina
  AR: Object.freeze(
    yupObject({
      street: string().max(55).trim().required(),
      city: string().max(35).trim().required(),
      state: string().max(35).trim().required(),
      zip: string()
        .matches(
          /^\d{4}([A-Z]{3})?$/,
          'Argentinian postal code must be 4 digits optionally followed by 3 letters'
        )
        .required(),
      geoLat: number().required(),
      geoLng: number().required(),
    })
  ),

  // Australia
  AU: Object.freeze(
    yupObject({
      street: string().max(55).trim().required(),
      suburb: string().max(35).trim().required(),
      city: string().max(35).trim().required(),
      state: string().max(35).trim().required(),
      zip: string()
        .matches(/^\d{4}$/, 'Australian postcode must be 4 digits')
        .required(),
      geoLat: number().required(),
      geoLng: number().required(),
    })
  ),

  // Belgium
  BE: Object.freeze(
    yupObject({
      street: string().max(55).trim().required(),
      city: string().max(35).trim().required(),
      zip: string()
        .matches(/^\d{4}$/, 'Belgian postal code must be 4 digits')
        .required(),
      geoLat: number().required(),
      geoLng: number().required(),
    })
  ),

  // Brazil
  BR: Object.freeze(
    yupObject({
      street: string().max(55).trim().required(),
      district: string().max(35).trim().required(),
      city: string().max(35).trim().required(),
      state: string().length(2).uppercase().required(),
      zip: string()
        .matches(
          /^\d{5}-\d{3}$/,
          'Brazilian postal code must be in format 12345-678'
        )
        .required(),
      geoLat: number().required(),
      geoLng: number().required(),
    })
  ),

  // Canada
  CA: Object.freeze(
    yupObject({
      street: string().max(55).trim().required(),
      city: string().max(35).trim().required(),
      province: string().length(2).uppercase().required(),
      zip: string()
        .matches(
          /^[A-Z]\d[A-Z] \d[A-Z]\d$/,
          'Canadian postal code must be in format A1A 1A1'
        )
        .required(),
      geoLat: number().required(),
      geoLng: number().required(),
    })
  ),

  // Switzerland
  CH: Object.freeze(
    yupObject({
      name: string().max(70).trim().optional(),
      street: string().max(55).trim().required(),
      zip: string()
        .matches(/^\d{4}$/)
        .required(),
      city: string().max(35).trim().required(),
      canton: string()
        .length(2)
        .uppercase()
        .matches(
          /^(ZH|BE|LU|UR|SZ|OW|NW|GL|ZG|FR|SO|BS|BL|SH|AR|AI|SG|GR|AG|TG|TI|VD|VS|NE|GE|JU)$/
        )
        .required(),
      geoLat: number().required(),
      geoLng: number().required(),
    })
  ),

  // China
  CN: Object.freeze(
    yupObject({
      province: string().max(35).trim().required(),
      city: string().max(35).trim().required(),
      district: string().max(35).trim().required(),
      street: string().max(55).trim().required(),
      zip: string()
        .matches(/^\d{6}$/, 'Chinese postal code must be 6 digits')
        .required(),
      geoLat: number().required(),
      geoLng: number().required(),
    })
  ),

  // Colombia
  CO: Object.freeze(
    yupObject({
      street: string().max(55).trim().required(),
      city: string().max(35).trim().required(),
      department: string().max(35).trim().required(),
      zip: string()
        .matches(/^\d{6}$/, 'Colombian postal code must be 6 digits')
        .required(),
      geoLat: number().required(),
      geoLng: number().required(),
    })
  ),

  // Denmark
  DK: Object.freeze(
    yupObject({
      street: string().max(55).trim().required(),
      city: string().max(35).trim().required(),
      zip: string()
        .matches(/^\d{4}$/, 'Danish postal code must be 4 digits')
        .required(),
      geoLat: number().required(),
      geoLng: number().required(),
    })
  ),

  // Egypt
  EG: Object.freeze(
    yupObject({
      district: string().max(35).trim().required(),
      city: string().max(35).trim().required(),
      governorate: string().max(35).trim().required(),
      zip: string()
        .matches(/^\d{5}$/, 'Egyptian postal code must be 5 digits')
        .required(),
      geoLat: number().required(),
      geoLng: number().required(),
    })
  ),

  // France
  FR: Object.freeze(
    yupObject({
      street: string().max(55).trim().required(),
      city: string().max(35).trim().required(),
      zip: string()
        .matches(/^\d{5}$/, 'French postal code must be 5 digits')
        .required(),
      geoLat: number().required(),
      geoLng: number().required(),
    })
  ),

  // Germany
  DE: Object.freeze(
    yupObject({
      street: string().max(55).trim().required(),
      city: string().max(35).trim().required(),
      zip: string()
        .matches(/^\d{5}$/, 'German postal code must be 5 digits')
        .required(),
      geoLat: number().required(),
      geoLng: number().required(),
    })
  ),

  // Iceland
  IS: Object.freeze(
    yupObject({
      street: string().max(55).trim().required(),
      city: string().max(35).trim().required(),
      zip: string()
        .matches(/^\d{3}$/, 'Icelandic postal code must be 3 digits')
        .required(),
      geoLat: number().required(),
      geoLng: number().required(),
    })
  ),

  // India
  IN: Object.freeze(
    yupObject({
      street: string().max(55).trim().required(),
      area: string().max(35).trim().required(),
      city: string().max(35).trim().required(),
      state: string().max(35).trim().required(),
      zip: string()
        .matches(/^\d{6}$/, 'Indian PIN code must be 6 digits')
        .required(),
      geoLat: number().required(),
      geoLng: number().required(),
    })
  ),

  // Israel
  IL: Object.freeze(
    yupObject({
      street: string().max(55).trim().required(),
      city: string().max(35).trim().required(),
      zip: string()
        .matches(/^\d{7}$/, 'Israeli postal code must be 7 digits')
        .required(),
      geoLat: number().required(),
      geoLng: number().required(),
    })
  ),

  // Italy
  IT: Object.freeze(
    yupObject({
      name: string().max(70).trim().optional(),
      street: string().max(55).trim().required(),
      zip: string()
        .matches(/^\d{5}$/)
        .required(),
      city: string().max(35).trim().required(),
      state: string().length(2).uppercase().required(),
      geoLat: number().required(),
      geoLng: number().required(),
    })
  ),

  // Japan
  JP: Object.freeze(
    yupObject({
      zip: string()
        .matches(
          /^\d{3}-\d{4}$/,
          'Japanese postal code must be in format 123-4567'
        )
        .required(),
      prefecture: string().max(35).trim().required(),
      city: string().max(35).trim().required(),
      district: string().max(35).trim().required(),
      street: string().max(55).trim().required(),
      geoLat: number().required(),
      geoLng: number().required(),
    })
  ),

  // Lebanon
  LB: Object.freeze(
    yupObject({
      district: string().max(35).trim().required(),
      city: string().max(35).trim().required(),
      zip: string()
        .matches(
          /^(\d{4}|\d{4} \d{4})$/,
          'Lebanese postal code must be 4 or 8 digits (XXXX or XXXX XXXX)'
        )
        .optional(),
      geoLat: number().required(),
      geoLng: number().required(),
    })
  ),

  // Lithuania
  LT: Object.freeze(
    yupObject({
      street: string().max(55).trim().required(),
      city: string().max(35).trim().required(),
      zip: string()
        .matches(
          /^LT-\d{5}$/,
          'Lithuanian postal code must be in format LT-12345'
        )
        .required(),
      geoLat: number().required(),
      geoLng: number().required(),
    })
  ),

  // New Zealand
  NZ: Object.freeze(
    yupObject({
      street: string().max(55).trim().required(),
      suburb: string().max(35).trim().required(),
      city: string().max(35).trim().required(),
      zip: string()
        .matches(/^\d{4}$/, 'New Zealand postcode must be 4 digits')
        .required(),
      geoLat: number().required(),
      geoLng: number().required(),
    })
  ),

  // Saudi Arabia
  SA: Object.freeze(
    yupObject({
      district: string().max(35).trim().required(),
      city: string().max(35).trim().required(),
      zip: string()
        .matches(/^\d{5}$/, 'Saudi Arabian postal code must be 5 digits')
        .required(),
      geoLat: number().required(),
      geoLng: number().required(),
    })
  ),

  // Singapore
  SG: Object.freeze(
    yupObject({
      block: string().max(10).trim().required(),
      street: string().max(55).trim().required(),
      unit: string().max(10).trim().optional(),
      zip: string()
        .matches(/^\d{6}$/, 'Singaporean postal code must be 6 digits')
        .required(),
      geoLat: number().required(),
      geoLng: number().required(),
    })
  ),

  // Slovakia
  SK: Object.freeze(
    yupObject({
      street: string().max(55).trim().required(),
      city: string().max(35).trim().required(),
      zip: string()
        .matches(/^\d{3} \d{2}$/, 'Slovak postal code must be in format 123 45')
        .required(),
      geoLat: number().required(),
      geoLng: number().required(),
    })
  ),

  // Thailand
  TH: Object.freeze(
    yupObject({
      street: string().max(55).trim().required(),
      subdistrict: string().max(35).trim().required(),
      district: string().max(35).trim().required(),
      province: string().max(35).trim().required(),
      zip: string()
        .matches(/^\d{5}$/, 'Thai postal code must be 5 digits')
        .required(),
      geoLat: number().required(),
      geoLng: number().required(),
    })
  ),

  // Netherlands
  NL: Object.freeze(
    yupObject({
      street: string().max(55).trim().required(),
      city: string().max(35).trim().required(),
      zip: string()
        .matches(
          /^\d{4} [A-Z]{2}$/,
          'Dutch postal code must be in format 1234 AB'
        )
        .required(),
      geoLat: number().required(),
      geoLng: number().required(),
    })
  ),

  // United Kingdom
  GB: Object.freeze(
    yupObject({
      street: string().max(55).trim().required(),
      locality: string().max(35).trim().optional(),
      city: string().max(35).trim().required(),
      zip: string()
        .matches(
          /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/,
          'UK postcode must be in valid format (e.g., SW1A 1AA)'
        )
        .required(),
      geoLat: number().required(),
      geoLng: number().required(),
    })
  ),

  // USA
  US: Object.freeze(
    yupObject({
      street: string().max(55).trim().required(),
      city: string().max(35).trim().required(),
      state: string().length(2).uppercase().required(),
      zip: string()
        .matches(
          /(^\d{5}$)|(^\d{5}-\d{4}$)/,
          'US ZIP code must be 5 or 9 digits'
        )
        .required(),
      geoLat: number().required(),
      geoLng: number().required(),
    })
  ),

  // Vietnam
  VN: Object.freeze(
    yupObject({
      name: string().max(70).trim().optional(),
      street: string().max(55).trim().required(),
      ward: string().max(35).trim().required(),
      city: string().max(35).trim().required(),
      zip: string()
        .matches(/^\d{6}$/)
        .required(),
      geoLat: number().required(),
      geoLng: number().required(),
    })
  ),
});
