import React from "react";
import PageTitle from "@/app/components/page-title";
import TransactionForm from "../_common/transaction-form";

function AddTransaction() {
  return (
    <div>
      <PageTitle title="Add Transaction" />
      <TransactionForm />
    </div>
  );
}

export default AddTransaction;
