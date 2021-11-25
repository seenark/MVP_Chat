// import { createStore } from "vuex";

// export default createStore({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {},
// });

import * as messages from "./messages";
import * as chatroom from "./chatroom";
import * as web3 from "./web3";
import * as account from "./account";
import * as websocket from "./websocket";
import { state } from "./store";

export default {
  state,
  messages: {
    ...messages,
  },
  chatroom: {
    ...chatroom,
  },
  web3: {
    ...web3,
  },
  account: {
    ...account,
  },
  websocket: {
    ...websocket,
  },
};
