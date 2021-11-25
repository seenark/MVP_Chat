import { setIsConnectingStatus } from "./../store/websocket/index";
import { IMessage, IUser } from "@/store/types";
import store from "../store/index";
import * as apis from "../apis";

interface IOnMessage {
  on: "joined" | "message" | "leave" | string;
  message: string;
  screename?: string;
  avatar?: string;
  time?: number;
  channel?: number;
}

let ws: WebSocket | null = null;

// export function getWs(): WebSocket {
//   return ws;
// }

export function connectWebsocket(walletAddress: string): void {
  const wsEndpoint = `${process.env.VUE_APP_BASE_WS_URL}/message/listen?wallet=${walletAddress}`;
  store.websocket.setIsConnectingStatus(true);
  ws = new WebSocket(wsEndpoint);
  ws.onopen = onOpen;
  ws.onclose = onClose;
  ws.onmessage = onMessage;
  ws.onerror = onError;
}

function onOpen() {
  console.warn("websocket connected");
  store.websocket.setWsIsConnectedStatus(true);
  store.websocket.setIsConnectingStatus(false);
  apis.getAllUsers();
  apis.getAllMessage();
}
function onClose() {
  console.warn("websocket disconnected");
  store.websocket.setWsIsConnectedStatus(false);
  store.chatroom.setAllUsers([]);
  ws = null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onMessage(event: MessageEvent): void {
  console.log("on msg", event.data);
  const msg: IOnMessage = JSON.parse(event.data);

  switch (msg.on) {
    case "message":
      eventOnMessage(msg);
      break;
    case "joined":
      eventOnJoined(msg);
      break;
    case "leave":
      eventOnLeave();
      break;
    default:
      break;
  }
}

// {"on":"message","message":"asdfa","screename":"1637734883","avatar":"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png","time":1637734937000,"channel":0}
function eventOnMessage(msg: IOnMessage) {
  const msg2: IMessage = {
    user: {
      screename: msg.screename ? msg.screename : "unknow",
      avatar: msg.avatar ? msg.avatar : "",
    },
    message: msg.message,
    time: msg.time ? msg.time : 0,
  };
  store.messages.appendMessage(msg2);
}

// {"on":"joined","message":"1637734065 joined","screename":"1637734065","avatar":"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png","time":1637734065000,"channel":0}
function eventOnJoined(msg: IOnMessage) {
  const user: IUser = {
    screename: msg.screename ? msg.screename : "unknow",
    avatar: msg.avatar,
  };
  store.chatroom.appendUser(user);
}

function eventOnLeave() {
  apis.getAllUsers();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onError(error: any): void {
  console.warn("websocket error", error);
  store.websocket.setIsConnectingStatus(false);
  ws = null;
}

export function sendMessage(message: string): void {
  const msg = {
    on: "message",
    message: message,
  };
  if (ws) ws.send(JSON.stringify(msg));
}

export function changeNameAndAvatar(name: string, avatarUrl: string): void {
  const msg = {
    on: "updateProfile",
    data: {
      screename: name,
      avatar: avatarUrl,
    },
  };
  if (ws) ws.send(JSON.stringify(msg));
  apis.getAllUsers();
}

export function closeWebsocket(): void {
  if (ws) ws.close();
  ws = null;
}

// function SendMessage() {
//   let message = document.getElementById("message").value;
//   if (connected !== true) {
//     alert("please connect to your channel");
//     return;
//   }
//   if (message.length < 1) {
//     alert("please enter your message");
//     return;
//   }

//   let json_raw = `{"on":"message","message":"` + message + `"}`;
//   socketMessage.send(json_raw);
// }

// function switchConnButton() {
//   if (connected == true) {
//     document.getElementById("connect").innerText = "Close";
//   } else {
//     document.getElementById("connect").innerText = "Connect";
//   }
// }
