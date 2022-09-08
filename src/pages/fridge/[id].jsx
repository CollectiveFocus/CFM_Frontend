import PropTypes from 'prop-types';
import Head from 'next/head';
import Fridge from 'components/organisms/Information';

export default function FridgePage(props) {
  return (
    <>
      <Head>
        <title>{'CFM: ' + props.fridge.name}</title>
      </Head>
      <Fridge {...props} />
    </>
  );
}
FridgePage.propTypes = Fridge.propTypes.isRequired;

const baseUrl = process.env.NEXT_PUBLIC_CFM_API_URL + '/v1/fridges/';

export async function getStaticPaths() {
  return {
    paths: await getAllFridgeIds().then((idList) =>
      idList.map((id) => ({ params: { id } }))
    ),
    fallback: false,
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
  return {
    props: await getFridgeRecord({ id: context.params.id }),
  };
}

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
getFridgeRecord.propTypes = PropTypes.exact({
  id: PropTypes.string.isRequired,
}).isRequired;
