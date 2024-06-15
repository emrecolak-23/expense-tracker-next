import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  username: string;
  clerkUserId: string;
  incomeCategories?: string[];
  expenseCategories?: string[];
}

export interface IUserModel extends Model<IUser> {
  build(attr: IUser): IUser;
}

export const UserSchema = new Schema<IUser, IUserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    incomeCategories: {
      type: Array,
      default: ["salary", "bonus", "interest", "dividend", "other"],
      required: true,
    },
    expenseCategories: {
      type: Array,
      default: [
        "food",
        "transportation",
        "shopping",
        "housing",
        "entertainment",
        "health",
        "insurance",
        "education",
        "donation",
        "utility",
        "other",
      ],
      required: true,
    },
    clerkUserId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

// delete model if it exists
if (mongoose.models && mongoose.models["users"]) {
  delete mongoose.models["users"];
}

UserSchema.statics.build = (attr: IUser) => {
  return new User(attr);
};

const User = mongoose.model<IUser, IUserModel>("users", UserSchema);

export { User };
