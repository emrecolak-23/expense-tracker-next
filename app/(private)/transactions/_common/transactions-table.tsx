"use client";
import React from "react";
import { ITransaction } from "@/app/models/transaction.model";
import { Button, Table, message } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { DeleteTransaction } from "@/app/server-actions/transactions";

function TransactionsTable({
  transactions,
}: {
  transactions: Omit<ITransaction, "_id">[];
}) {
  const route = useRouter();
  const [loading, setLoading] = React.useState(false);

  const deleteTransaction = async (id: string) => {
    try {
      setLoading(true);
      const response = await DeleteTransaction(id);
      console.log(response, "response");
      if (response?.success) {
        message.success(response.message);
      } else {
        throw new Error(response!.error);
      }
    } catch (err: any) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render(date: string) {
        return dayjs(date).format("MMM DD, YYYY");
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render(amount: number) {
        return amount.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
      },
    },

    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Action",
      dataIndex: "action",
      render(value: any, record: ITransaction) {
        return (
          <div className="flex gap-5">
            <Button
              size="small"
              onClick={() => route.push(`/transactions/edit/${record._id}`)}
            >
              <i className="ri-pencil-line"></i>
            </Button>
            <Button size="small" onClick={() => deleteTransaction(record._id)}>
              <i className="ri-delete-bin-line"></i>
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="capitalize">
      <Table dataSource={transactions} columns={columns} loading={loading} />
    </div>
  );
}

export default TransactionsTable;
