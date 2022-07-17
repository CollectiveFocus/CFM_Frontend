import { FridgeDialogSchema, ReportDialogSchema } from 'schema/cfm';

export default function page(props) {
  const { fridge, report } = props;

  return (
    <pre>
      fridge: {FridgeDialogSchema.validate(fridge)}
      report: {ReportDialogSchema.validate(report)}
    </pre>
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
  const update = reports.length > 0 ? reports[0] : null;
  return { props: { fridge, update } };
}
