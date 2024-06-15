import React, { Suspense } from "react";
import PageTitle from "@/app/components/page-title";
import LinkButton from "@/app/components/link-button";
import TransactionsData from "./_common/transactions-data";
import Filters from "@/app/components/filters";
import Loader from "@/app/components/loader";

function Transactions({ searchParams }: { searchParams: any }) {
  const suspenseKey = JSON.stringify(searchParams);
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Transactions" />
        <LinkButton title="Add Transaction" path="/transactions/add" />
      </div>
      <Filters />
      <Suspense
        key={suspenseKey}
        fallback={
          <div className="h-40">
            <Loader />
          </div>
        }
      >
        <TransactionsData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

export default Transactions;
