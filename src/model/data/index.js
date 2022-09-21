export async function fetchFridgesAndReports() {
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
  return { fridges, reports };
}
