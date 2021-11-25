import { IUser } from "../types";
import { MUTAION } from "./constant";
import { mutation } from "../store";

export const setAllUsers = mutation<IUser[]>(MUTAION.setAllUsers, (state, users) => {
  state.users = users;
});

export const appendUser = mutation<IUser>(MUTAION.appendUser, (state, user) => {
  state.users.push(user);
});
