"use server";
import Transaction, { ITransaction } from "../models/transaction.model";
import { revalidatePath } from "next/cache";
import { GetLoggedInUserFromMongoDb } from "./users";

export type ActionsResponseType = {
  success: boolean;
  message?: string;
  error?: string;
};

export const AddNewTransaction = async (
  payload: ITransaction
): Promise<ActionsResponseType> => {
  try {
    await Transaction.create(payload);
    revalidatePath("/transactions");
    return {
      message: "Transaction added successfully",
      success: true,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message,
    };
  }
};

export const GetTransactions = async (filters: any) => {
  try {
    const loggedInUser = await GetLoggedInUserFromMongoDb();
    let sortOrderToPass: any = {
      date: -1,
    };
    if (filters.sortOrder) {
      sortOrderToPass["date"] = filters.sortOrder === "asc" ? 1 : -1;
      delete filters.sortOrder;
    }
    let filtersToPass: any = {
      user: loggedInUser?._id,
    };

    if (filters.type) {
      filtersToPass["type"] = filters.type;
    }

    if (filters.category) {
      filtersToPass["category"] = filters.category;
    }

    if (filters.fromDate || filters.toDate) {
      if (filters.fromDate) {
        filtersToPass["date"] = {
          ...filtersToPass["date"],
          $gte: filters.fromDate,
        };
      }

      if (filters.toDate) {
        filtersToPass["date"] = {
          ...filtersToPass["date"],
          $lte: filters.toDate,
        };
      }
    }

    const transactions = await Transaction.find(filtersToPass).sort(
      sortOrderToPass
    );
    return JSON.parse(JSON.stringify(transactions));
  } catch (err: any) {
    return {
      error: err.message,
    };
  }
};

export const UpdateTransaction = async ({
  transactionId,
  payload,
}: {
  transactionId: string;
  payload: Partial<ITransaction>;
}) => {
  try {
    await Transaction.findByIdAndUpdate(transactionId, payload);
    revalidatePath("/transactions");
    return {
      message: "Transaction updated successfully",
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const DeleteTransaction = async (transactionId: string) => {
  try {
    await Transaction.findByIdAndDelete(transactionId);
    revalidatePath("/transactions");
    return {
      message: "Transaction deleted successfully",
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};
