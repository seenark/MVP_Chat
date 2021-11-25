import { getter } from "../store";
import { ACTION } from "./constant";
export const getMessages = getter(ACTION.getMessage, (state) => state.messages);
