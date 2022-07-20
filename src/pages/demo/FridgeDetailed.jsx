import Head from 'next/head';
import { Grid } from '@mui/material';
import { FridgeDetailed } from 'components/molecules';

export default function FridgeDetailedPage(props) {
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
            photo={props.fridge.photoURL}
            name={props.fridge.name}
            tags={props.fridge.tags}
            location={props.fridge.location}
            info={props.fridge.notes}
            instagram={props.fridge.maintainer.instagram}
            website={props.fridge.maintainer.website}
            foodPhoto={props.report.foodPhotoURL}
            lastUpdate={props.report.timestamp
              .split('T')[0]
              .replaceAll('-', '/')}
            notes={props.report.notes}
            status={props.report.operation}
            foodAvailable={props.report.foodPercentage}
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
    fetch(fridgeUrl + '/reports', { headers: { Accept: 'application/json' } }),
  ]);
  for (const response of responses) {
    if (!response.ok) {
      console.error(
        `ERROR ${response.url} ${response.status}: ${response.statusText}`
      );
      return { notFound: true };
    }
  }
  const [fridge, reports] = await Promise.all(responses.map((r) => r.json()));
  const report = reports.length > 0 ? reports[0] : null;
  return { props: { fridge, report } };
}
