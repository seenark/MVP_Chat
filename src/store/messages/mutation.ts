import { mutation } from "../store";
import { IMessage } from "../types";
import { MUTATION } from "./constant";

export const setWholeMessages = mutation<IMessage[]>(MUTATION.setWholeMessages, (state, payload) => {
  state.messages = payload;
});

export const appendMessage = mutation<IMessage>(MUTATION.appendMessage, (state, payload) => {
  const newMsgs = [payload, ...state.messages];
  state.messages = newMsgs;
});
