import { UserButton } from "@clerk/nextjs";
import React from "react";
import { UserType } from "@/app/interfaces";
import useUsersStore, { UsersStoreType } from "../store/users";
import { useRouter } from "next/navigation";

function Header() {
  const { loggedInUser }: { loggedInUser: UserType | null } =
    useUsersStore() as UsersStoreType;

  const router = useRouter();

  return (
    <div className="p-5 bg-primary flex justify-between items-center">
      <div>
        <h1
          className="font-bold text-white text-3xl cursor-pointer"
          onClick={() => router.push("/")}
        >
          E E T
        </h1>
      </div>
      <div className="flex items-center gap-5 bg-white p-2 rounded-sm">
        <span
          className="text-primary underline cursor-pointer"
          onClick={() => router.push("/profile")}
        >
          {loggedInUser?.name}
        </span>
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </div>
  );
}

export default Header;
