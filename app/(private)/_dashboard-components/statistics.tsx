import { TransactionType } from "@/app/interfaces";
import React from "react";
import StatisticsCard from "./statistics-card";

function Statistics({ transactions }: { transactions: TransactionType[] }) {
  let totalIncome = 0;
  let totalExpense = 0;
  let totalTransactions = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      totalIncome += transaction.amount;
    } else {
      totalExpense += transaction.amount;
    }
    totalTransactions++;
  });

  const totalBalance = totalIncome - totalExpense;

  return (
    <div className="mt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatisticsCard
          title="Total Income"
          value={totalIncome}
          icon="./income.png"
          valueColor="#A1C398"
          isCurrency
        />
        <StatisticsCard
          title="Total Expense"
          value={totalExpense}
          icon="./expense.png"
          valueColor="#E72929"
          isCurrency
        />
        <StatisticsCard
          title="Balance"
          value={totalBalance}
          icon="./balance.png"
          valueColor="#008DDA"
          isCurrency
        />
        <StatisticsCard
          title="Total Transactions"
          value={totalTransactions}
          icon="./transaction.png"
          valueColor="#FFC700"
          isCurrency={false}
        />
      </div>
    </div>
  );
}

export default Statistics;
