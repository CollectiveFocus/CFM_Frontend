import dialog from 'schema/dialog';

if (process.env.NODE_ENV !== 'production') {
} else {
}
const fridge = {
  id: 'greenpointfridge',
  name: 'Greenpoint Fridge',
  tags: ['harlem', 'halal', 'kashrut'],
  location: {
    street: '17 Nassau Ave',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11222',
    geoLat: 40.72283,
    geoLng: -73.95412,
  },
  maintainer: {
    name: 'Emily Ward',
    organization: 'Food For People',
    phone: '(782) 654-4748',
    email: 'eward@example.net',
    website: 'http://gray.com/',
    instagram: 'https://www.instagram.com/greenpointfridge/?hl=en',
  },
  notes: 'Next to Lot Radio.',
  photoURL: 'http://127.0.0.1:3000/fridge.webp',
  verified: false,
};

export default function SchemaTestPage() {
  const value = dialog.Fridge.validateSync(fridge);
  console.log('fridge');
  console.log(value);

  return (
    <div>
      {' '}
      <h1>Schema Test</h1> <p>{process.env.NODE_ENV}</p>
      <p>Hello</p>{' '}
    </div>
  );
}
