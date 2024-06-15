"use client";
import React, { useEffect } from "react";
import Header from "./header";
import { message } from "antd";
import { GetLoggedInUserFromMongoDb } from "@/app/server-actions/users";
import { usePathname } from "next/navigation";
import { UsersStoreType } from "../store/users";
import useUsersStore from "../store/users";
import { UserType } from "../interfaces";
import Loader from "../components/loader";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const { loggedInUser, SetLoggedInUser }: UsersStoreType =
    useUsersStore() as UsersStoreType;
  const pathname = usePathname();
  const isPublicRoute =
    pathname.includes("/sign-in") || pathname.includes("/sign-up");

  const getLoggedInUser = async () => {
    try {
      const response = await GetLoggedInUserFromMongoDb();
      if (response.error) throw new Error(response.error);
      SetLoggedInUser(response as UserType);
    } catch (err: any) {
      message.error(err.message);
    }
  };

  useEffect(() => {
    if (!loggedInUser && !isPublicRoute) getLoggedInUser();
  }, [pathname]);

  if (isPublicRoute) return children;

  if (!isPublicRoute && !loggedInUser)
    return (
      <div className="h-screen">
        <Loader />
      </div>
    );

  return (
    loggedInUser && (
      <div>
        <Header />
        <div className="p-5">{children}</div>
      </div>
    )
  );
}

export default LayoutProvider;
