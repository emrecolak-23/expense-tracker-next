import { create } from "zustand";
import { UserType } from "../interfaces";

const useUsersStore = create((set) => ({
  loggedInUser: null,
  SetLoggedInUser: (user: UserType) => set({ loggedInUser: user }),
}));

export default useUsersStore;

export interface UsersStoreType {
  loggedInUser: UserType | null;
  SetLoggedInUser: (user: UserType) => void;
}
