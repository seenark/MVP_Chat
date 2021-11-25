import { IResponseMessageRoot } from "./types";
import { IMessage, IUser } from "../store/types";
import axios from "./axios";
import store from "../store/index";

export interface UserResponse {
  status: number;
  users: IUser[];
}

export async function getAllUsers(): Promise<IUser[]> {
  const url = `/users`;
  const { data } = await axios.get<UserResponse>(url);
  console.log("🚀 ~ file: index.ts ~ line 7 ~ getAllUsers ~ data", data);
  store.chatroom.setAllUsers(data.users);
  return data.users;
}

export async function getAllMessage(): Promise<IMessage[]> {
  const url = `/messages`;
  const { data } = await axios.get<IResponseMessageRoot>(url);
  console.log("data", data.data);
  const messages: IMessage[] = data.data.map((d) => {
    const msg: IMessage = {
      user: {
        screename: d.screename,
        avatar: d.avatar,
        wallet: "",
        uid: d.uid,
      },
      message: d.message,
      time: d.time,
      room: d.room,
    };
    return msg;
  });
  store.messages.setWholeMessages(messages);
  return messages;
}
