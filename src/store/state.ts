import Web3 from "web3";
import { IMessage, IUser, IWebsocket } from "./types";

interface IState {
  messages: IMessage[];
  users: IUser[];
  account?: IUser;
  web3?: Web3;
  websocket: IWebsocket;
}

const mockUser: IUser[] = [
  {
    screename: "Jurgen Klopp",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Y8SNP2Aq8o1F2e3JuH9x8rzkugjsTOz90A&usqp=CAU",
  },
  {
    screename: "Jose Mourinho",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdUZIjjB46AiQOSso31-vtj5YmALAtZSO01g&usqp=CAU",
  },
];

export const STATE: IState = {
  messages: [],
  users: [],
  account: undefined,
  web3: undefined,
  websocket: {
    isConnecting: false,
    isConnected: false,
  },
};
