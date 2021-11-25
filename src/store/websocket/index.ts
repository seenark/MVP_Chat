import { getter, mutation } from "../store";

export const isConnected = getter("isConnected", (state) => state.websocket.isConnected);

export const setWsIsConnectedStatus = mutation<boolean>("setConStatus", (state, isConnected) => {
  state.websocket.isConnected = isConnected;
});
export const setIsConnectingStatus = mutation<boolean>("setConStatus", (state, isConnecting) => {
  state.websocket.isConnecting = isConnecting;
});
