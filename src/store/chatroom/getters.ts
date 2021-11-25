import { GETTER } from "./constant";
import { getter } from "../store";

export const getAllUsers = getter(GETTER.getAllUsers, (state) => state.users);
