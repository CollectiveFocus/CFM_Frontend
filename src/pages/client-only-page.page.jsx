import React, { useEffect } from "react";
import useIsClient from "../components/useIsClient";
import useMedia from "../components/useMedia";
import LayoutMobile from "../components/LayoutMobile";
import LayoutDesktop from "../components/LayoutDesktop";
import ChildA from "../components/ChildA";
import ChildB from "../components/ChildB";
import useDataStore from "../stores/useDataStore";

const API_URL = `${process.env.NEXT_PUBLIC_FF_API_URL}/v1/fridges/`;

export default function ClientOnlyPage() {
  const isClient = useIsClient();
  const isDesktop = useMedia("(min-width: 768px)");

  // Zustand selectors
  const data = useDataStore((s) => s.data);
  const loading = useDataStore((s) => s.loading);
  const error = useDataStore((s) => s.error);
  const fetchData = useDataStore((s) => s.fetchData);
  const reset = useDataStore((s) => s.reset);

  useEffect(() => {
    if (!isClient) return;
    fetchData(API_URL);
    return () => {
      // optional: reset store on unmount to avoid stale data if desired
      // reset();
    };
  }, [isClient, fetchData, API_URL, reset]);

  if (!isClient) return null;

  if (loading) return <div aria-busy="true">Loading…</div>;
  if (error)
    return (
      <div role="alert">
        <p>Failed to load data: {error.message}</p>
        <button type="button" onClick={() => fetchData(API_URL)}>
          Retry
        </button>
      </div>
    );

  const Layout = isDesktop ? LayoutDesktop : LayoutMobile;

  return (
    <Layout>
      <ChildA data={data?.a} />
      <ChildB items={data?.items} />
    </Layout>
  );
}
