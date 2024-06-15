"use client";
import React from "react";
import { Form, Input, Select, Button, message } from "antd";
import useUsersStore, { UsersStoreType } from "@/app/store/users";
import {
  AddNewTransaction,
  ActionsResponseType,
  UpdateTransaction,
} from "@/app/server-actions/transactions";
import { useRouter } from "next/navigation";
import { ITransaction } from "@/app/models/transaction.model";

function TransactionForm({
  isEdit,
  initialValues,
}: {
  isEdit?: boolean;
  initialValues: Partial<ITransaction>;
}) {
  const router = useRouter();
  const [categoriesToShow, setCategoriesToShow] = React.useState<string[]>([]);
  const [form] = Form.useForm();
  const { loggedInUser }: UsersStoreType = useUsersStore() as UsersStoreType;
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values: any) => {
    try {
      let response: ActionsResponseType | null = null;
      setLoading(true);

      if (!isEdit) {
        response = await AddNewTransaction({
          ...values,
          amount: Number(values.amount),
          user: loggedInUser?._id,
        });
      } else {
        response = await UpdateTransaction({
          transactionId: initialValues._id,
          payload: values,
        });
      }

      if (response?.success) {
        message.success(response.message);
        router.push("/transactions");
      } else {
        throw new Error(response!.error);
      }
    } catch (err: any) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-7">
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Form.Item
            name="name"
            label="Name"
            className="col-span-1 lg:col-span-2"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            className="col-span-1 lg:col-span-1"
            rules={[{ required: true, message: "Please select date" }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Amount"
            className="col-span-1 lg:col-span-1"
            rules={[{ required: true, message: "Please enter amount" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="type"
            label="Transaction Type"
            className="col-span-1 lg:col-span-1"
            rules={[{ required: true, message: "Please select type" }]}
          >
            <Select
              onChange={(value) => {
                if (value === "income") {
                  setCategoriesToShow(loggedInUser?.incomeCategories || []);
                } else {
                  setCategoriesToShow(loggedInUser?.expenseCategories || []);
                }

                form.setFieldsValue({ category: "" });
              }}
            >
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            className="col-span-1 lg:col-span-1 capitalize"
          >
            <Select>
              <Select.Option value="">Select Category</Select.Option>
              {categoriesToShow.map((category) => {
                return (
                  <Select.Option
                    key={category}
                    value={category}
                    className="capitalize"
                  >
                    {category}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item name="note" label="Note" className="col-span-3">
            <Input.TextArea />
          </Form.Item>
        </div>
        <div className="flex justify-end gap-5">
          <Button
            disabled={loading}
            onClick={() => router.push("/transactions")}
          >
            Cancel
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            disabled={loading}
            loading={loading}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default TransactionForm;
