export interface UserType {
  _id: string;
  clerkUserId: string;
  name: string;
  email: string;
  username: string;
  incomeCategories: string[];
  expenseCategories: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TransactionType {
  _id: string;
  clerkUserId: string;
  amount: number;
  category: string;
  type: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
