import Head from 'next/head';
import { Grid } from '@mui/material';
import { FridgeDetailed } from 'components/molecules';

const info = {
  fridge: {
    id: 'greenpointfridge',
    name: 'Greenpoint Fridge',
    tags: ['harlem', 'halal', 'kashrut'],
    location: {
      street: '910 Woodland Drive',
      city: 'Navarre',
      state: 'FL',
      zip: 32566,
      geoLat: 27.96305,
      geoLng: -82.27026,
    },
    notes: 'Next to Lot Radio.',
    photoURL: '/fridge/8r9kCox.png',
    verified: false,
  },
  update: {
    timestamp: '2022-03-29T18:10:38.547Z',
    operation: 'working',
    foodPercentage: 100,
    foodPhotoURL: '/fridge/8r9kCox.png',
    notes: 'Filled with Mars bars and M&M candy.',
  },
  maintainer: {
    name: 'Jasmine Flores',
    organization: 'Garcia-Hansen Wellness',
    phone: '182-977-3823',
    email: 'jflores@example.org',
    website: 'http://wellness.com/',
    instagram: 'garcia-hansenwellness',
  },
};

export default function page(props) {
  return (
    <>
      <Head>
        <title>Community Fridge Map - Fridge Detailed</title>
      </Head>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        spacing={4}
      >
        <Grid item xs={12} md={4} lg={4}>
          <FridgeDetailed
            photo={info.fridge.photoURL}
            name={info.fridge.name}
            tags={info.fridge.tags}
            location={info.fridge.location}
            info={info.fridge.notes}
            instagram={info.maintainer.instagram}
            website={info.maintainer.website}
            foodPhoto={info.update.foodPhotoURL}
            lastUpdate={info.update.timestamp
              .split('T')[0]
              .replaceAll('-', '/')}
            notes={info.update.notes}
            status={info.update.operation}
            foodAvailable={info.update.foodPercentage}
          />
        </Grid>
      </Grid>
    </>
  );
}

export async function getServerSideProps() {
  const fridgeId = 'greenpointfridge';
  const fridgeUrl =
    process.env.NEXT_PUBLIC_CFM_API_URL + '/v1/fridges/' + fridgeId;
  const responses = await Promise.all([
    fetch(fridgeUrl, { headers: { Accept: 'application/json' } }),
    fetch(fridgeUrl + '/updates', { headers: { Accept: 'application/json' } }),
  ]);
  for (const response of responses) {
    if (!response.ok) {
      console.error(
        `ERROR ${response.url} ${response.status}: ${response.statusText}`
      );
      return { notFound: true };
    }
  }
  const [fridge, updates] = await Promise.all(responses.map((r) => r.json()));
  const update = updates.length > 0 ? updates[0] : null;
  return { props: { fridge, update } };
}
