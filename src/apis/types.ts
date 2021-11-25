export interface IResponseMessage {
  on: string;
  message: string;
  uid: string;
  screename: string;
  avatar: string;
  time: any;
  room: string;
}

export interface IResponseMessageRoot {
  build: number;
  data: IResponseMessage[];
  status: number;
}
