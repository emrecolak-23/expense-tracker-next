import React, { Suspense } from "react";
import LinkButton from "../components/link-button";
import DashboardData from "./_dashboard-components/dashboard-data";
import PageTitle from "../components/page-title";
import Loader from "../components/loader";

export default async function Home({ searchParams }: { searchParams: any }) {
  const suspenseKey = JSON.stringify(searchParams);
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Dashboard" />
        <LinkButton title="Transactions" path="/transactions" />
      </div>
      <Suspense
        key={suspenseKey}
        fallback={
          <div className="h-40">
            <Loader />
          </div>
        }
      >
        <DashboardData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
