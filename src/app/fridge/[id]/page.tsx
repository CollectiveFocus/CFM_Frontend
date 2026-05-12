import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  FridgeInformation,
  FridgeReportSection,
} from 'features/fridge-details';
import { Fridge } from 'types/domain';

interface FridgePageProps {
  params: Promise<{ id: string }>;
}

const baseUrl = `${process.env.NEXT_PUBLIC_FF_API_URL}/v1/fridges/`;

async function getFridgeInfo(id: string): Promise<Fridge | null> {
  try {
    const response = await fetch(`${baseUrl}${id}`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const apiFridge = await response.json();
    return { ...apiFridge, report: null };
  } catch (error) {
    console.error(`Failed to fetch fridge ${id}:`, error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: FridgePageProps): Promise<Metadata> {
  const { id } = await params;
  const fridge = await getFridgeInfo(id);

  return {
    title: fridge ? `Fridge Finder: ${fridge.name}` : 'Fridge Not Found',
  };
}

export default async function FridgePage({
  params,
}: FridgePageProps): Promise<React.ReactElement> {
  const { id } = await params;
  const fridge = await getFridgeInfo(id);

  if (!fridge) {
    notFound();
  }

  return (
    <FridgeInformation
      fridge={fridge}
      fridgeReportSection={<FridgeReportSection fridgeId={id} />}
    />
  );
}
