import { FridgeList } from 'components/organisms';
import { Grid } from '@mui/material';
import Head from 'next/head';

export default function FridgeListPage(props) {
  return (
    <>
      <Head>
        <title>Community Fridge Map - Fridge Information</title>
      </Head>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={6} sx={{ paddingX: 5.5 }}>
          <FridgeList {...props} />
        </Grid>
      </Grid>
    </>
  );
}

export async function getServerSideProps() {
  const fridgeUrl = `${process.env.NEXT_PUBLIC_CFM_API_URL}/v1/fridges/`;
  const reportsUrl = `${process.env.NEXT_PUBLIC_CFM_API_URL}/v1/reports/`;
  const responses = await Promise.all([
    fetch(fridgeUrl, {
      headers: { Accept: 'application/json' },
    }),
    fetch(reportsUrl, {
      headers: { Accept: 'application/json' },
    }),
  ]);
  for (const response of responses) {
    if (!response.ok) {
      console.error(
        `ERROR ${response.url} ${response.status}: ${response.statusText}`
      );
      return { notFound: true };
    }
  }
  const [fridges, reports] = await Promise.all(
    responses.map((response) => response.json())
  );
  return { props: { fridges, reports } };
}
