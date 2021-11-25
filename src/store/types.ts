export interface IUser {
  screename?: string;
  avatar?: string;
  wallet?: string;
  uid?: string;
}

export interface IMessage {
  user: IUser;
  message: string;
  time?: number;
  room?: string;
}

export interface IWebsocket {
  isConnected: boolean;
  isConnecting: boolean;
}
