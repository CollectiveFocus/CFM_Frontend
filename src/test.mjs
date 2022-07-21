import pkg from './schema/cfm/yup/index.js';
const {
  FridgeDialogSchema,
  DialogSchema: { Fridge },
} = pkg;

if (process.env.NODE_ENV !== 'production') {
} else {
}

//console.log(process.env.NODE_ENV)

const fridge = {
  name: 'Greenpoint Fridge',
  location: {
    street: '17 Nassau Ave',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11222',
    geoLat: 40.72283,
    geoLng: -73.95412,
  },
  notes: 'Next to Lot Radio.',
};

Fridge.validate(fridge)
  .then((data) => console.log(data))
  .catch((e) => {
    const error = {
      message: e.message,
      field: e.path,
    };
    console.error(error);
  });

// const report = {
//   id: '2022-03-29T18:10:38.547Z',
//   fridgeId: 'test',
//   timestamp: '2022-03-29T18:10:38.547Z',
//   operation: 'working',
//   foodPercentage: 100,
//   notes: 'Filled with Mars bars and M&M candy.',
// };
// ReportDialogSchema.validate(report).catch((e) => {
//   const error = {
//     message: e.message,
//     field: e.path,
//   };
//   console.clear();
//   console.error('error');
//   console.error(error);
//   console.error(report);
// });
