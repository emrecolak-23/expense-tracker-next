import React from "react";
import PageTitle from "@/app/components/page-title";
import TransactionForm from "../../_common/transaction-form";
import Transaction from "@/app/models/transaction.model";

async function EditTransactions({ params }: { params: { id: string } }) {
  const transaction = await Transaction.findById(params.id);
  return (
    <div>
      <PageTitle title="Edit Transaction" />
      <TransactionForm
        isEdit={true}
        initialValues={JSON.parse(JSON.stringify(transaction))}
      />
    </div>
  );
}

export default EditTransactions;
