import mongoose, { Schema, Document, Model, ObjectId } from "mongoose";

export interface ITransaction extends Document {
  name: string;
  amount: number;
  category: string;
  type: string;
  date: string;
  user: ObjectId;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITransactionModel extends Model<ITransaction> {
  build(attr: ITransaction): ITransaction;
}

export const transactionSchema = new Schema<ITransaction, ITransactionModel>(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      ref: "users",
      type: mongoose.Schema.Types.ObjectId,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

if (mongoose.models["transactions"]) {
  delete mongoose.models["transactions"];
}

transactionSchema.statics.build = (attr: ITransaction) => {
  return new Transaction(attr);
};

const Transaction = mongoose.model<ITransaction, ITransactionModel>(
  "transactions",
  transactionSchema
);

export default Transaction;
