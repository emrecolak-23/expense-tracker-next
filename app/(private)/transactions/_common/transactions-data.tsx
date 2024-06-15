import { GetTransactions } from "@/app/server-actions/transactions";
import React from "react";
import TransactionsTable from "./transactions-table";

async function TransactionsData({ searchParams }: { searchParams: any }) {
  const transactions = await GetTransactions(searchParams);

  return (
    <div>
      <TransactionsTable transactions={transactions} />
    </div>
  );
}

export default TransactionsData;
