"use server";

import { connectToDatabase } from "@/app/config/db-connection";
import { currentUser } from "@clerk/nextjs";
import { User } from "../models/user.model";
import { UserType } from "../interfaces";

connectToDatabase();

export const GetLoggedInUserFromMongoDb = async () => {
  try {
    const clerkUser = await currentUser();

    // check if the user is already in the database
    const user = await User.findOne({ clerkUserId: clerkUser?.id });

    if (user) {
      return JSON.parse(JSON.stringify(user));
    }

    // if the user is not in the database, add them
    let name, email, username, clerkUserId;
    name = clerkUser?.firstName + " " + clerkUser?.lastName;
    email = clerkUser?.emailAddresses[0]?.emailAddress!;
    username = clerkUser?.username!;
    clerkUserId = clerkUser?.id!;

    const newUser = await User.create({
      name,
      email,
      username,
      clerkUserId,
    });

    return JSON.parse(JSON.stringify(newUser));
  } catch (err: any) {
    return { error: err.message };
  }
};

export const UpdateUser = async ({
  userId,
  payload,
}: {
  userId: string;
  payload: Partial<UserType>;
}) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, payload, {
      new: true,
    });
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (err: any) {
    return { error: err.message };
  }
};
