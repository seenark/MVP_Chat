<script lang="ts" setup>
import { getAllUsers } from "./apis";
import store from "./store";
import { getWeb3 } from "./Web3/web3";
import { connectWebsocket } from "./WebSocket";

async function setWeb3() {
  const web3 = await getWeb3();
  if (!web3) {
    return;
  }
  // store.web3.setWeb3(web3);
  const accounts = await web3.eth.getAccounts();
  if (accounts.length == 0) {
    return;
  }
  store.account.setAccount({
    wallet: accounts[0],
  });
  connectWebsocket(accounts[0]);
}
setWeb3();

// async function fetchUserInChatroom() {
//   const users = await getAllUsers();
//   store.chatroom.setAllUsers(users);
// }
// fetchUserInChatroom();
</script>

<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
