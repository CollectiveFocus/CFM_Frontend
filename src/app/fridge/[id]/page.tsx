import React from 'react';
import { Metadata } from 'next';
import { FridgeInformation } from 'features/fridge-details';
import { Fridge, FridgeReport } from 'types/domain';

interface FridgePageProps {
  params: Promise<{ id: string }>;
}

const baseUrl = `${process.env.NEXT_PUBLIC_FF_API_URL}/v1/fridges/`;

async function getFridgeRecord(
  id: string
): Promise<{ fridge: Fridge | null; report: FridgeReport | null }> {
  try {
    const responses = await Promise.all([
      fetch(`${baseUrl}${id}`, {
        headers: { Accept: 'application/json' },
        next: { revalidate: 60 },
      }),
      fetch(`${baseUrl}${id}/reports`, {
        headers: { Accept: 'application/json' },
        next: { revalidate: 60 },
      }),
    ]);

    for (const response of responses) {
      if (!response.ok) {
        return { fridge: null, report: null };
      }
    }

    const [apiFridge, reports] = await Promise.all(
      responses.map((r) => r.json())
    );
    const report = reports.length > 0 ? reports[0] : null;

    const fridge: Fridge = {
      ...apiFridge,
      report: apiFridge.latestFridgeReport || null,
    };

    return { fridge, report };
  } catch (error) {
    console.error(`Failed to fetch fridge ${id}:`, error);
    return { fridge: null, report: null };
  }
}

export async function generateMetadata({
  params,
}: FridgePageProps): Promise<Metadata> {
  const { id } = await params;
  const { fridge } = await getFridgeRecord(id);

  return {
    title: fridge ? `Fridge Finder: ${fridge.name}` : 'Fridge Not Found',
  };
}

export default async function FridgePage({
  params,
}: FridgePageProps): Promise<React.ReactElement> {
  const { id } = await params;
  const { fridge, report } = await getFridgeRecord(id);

  if (!fridge) {
    return <div>Fridge not found</div>;
  }

  return <FridgeInformation fridge={fridge} report={report} />;
}
