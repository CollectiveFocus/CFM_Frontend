import PropTypes from 'prop-types';
import Head from 'next/head';
import { FridgeInformation } from 'components/molecules';

export async function getServerSideProps(context) {
  return {
    props: await getFridgeRecord({ id: context.params.id }),
  };
}

export default function FridgePage(props) {
  return (
    <>
      <Head>
        <title>{'Fridge Finder: ' + props.fridge.name}</title>
      </Head>
      <FridgeInformation {...props} />
    </>
  );
}
FridgePage.propTypes = FridgeInformation.propTypes



const baseUrl = process.env.NEXT_PUBLIC_FF_API_URL + '/v1/fridges/';



async function getAllFridgeIds() {
  return fetch(baseUrl, { headers: { Accept: 'application/json' } })
    .then((response) => response.json())
    .then((json) => json.map((fridge) => fridge.id))
    .catch((err) => {
      console.error(err);
      return [];
    });
}

async function getFridgeRecord({ id }) {
  const responses = await Promise.all([
    fetch(baseUrl + id, { headers: { Accept: 'application/json' } }),
    fetch(baseUrl + id + '/reports', {
      headers: { Accept: 'application/json' },
    }),
  ]);
  for (const response of responses) {
    if (!response.ok) {
      console.error(
        `ERROR ${response.url} ${response.status}: ${response.statusText}`
      );
      return {};
    }
  }
  const [fridge, reports] = await Promise.all(responses.map((r) => r.json()));
  const report = reports.length > 0 ? reports[0] : null;
  return { fridge, report };
}
getFridgeRecord.propTypes = {
  id: PropTypes.string.isRequired,
};
