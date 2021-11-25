<script lang="ts" setup>
import { ref, computed } from "vue";
import Msg from "@/components/Msg.vue";
import store from "../store";
import { connectMetamaskWallet } from "../Web3/web3";
import { connectWebsocket, sendMessage, closeWebsocket, changeNameAndAvatar } from "../WebSocket/index";
import * as apis from "@/apis";

// store.messages.appendMessage({
//   user: {
//     name: "Hades God",
//     imageUrl: "https://www.pngitem.com/pimgs/m/570-5708777_reborn-png-photo-katekyo-hitman-reborn-png-transparent.png",
//   },
//   message:
//     "Erat sed rebum stet diam clita gubergren sit. Clita et lorem dolores sanctus, dolor accusam sed ipsum sit amet stet, ea et dolore et elitr. Consetetur tempor invidunt sit sed lorem et diam sadipscing rebum. Sanctus et justo consetetur elitr lorem consetetur no, invidunt takimata elitr consetetur et sadipscing, voluptua voluptua duo invidunt et accusam at, vero stet magna aliquyam sea dolor nonumy clita. Dolor diam justo et sanctus. Voluptua erat amet diam magna. Labore et diam ut at ipsum amet et kasd diam, sea lorem consetetur sit aliquyam erat dolore ut sanctus diam. Sit et ipsum diam lorem et ipsum, et erat voluptua amet amet. Lorem erat duo sed et kasd kasd, nonumy est lorem clita gubergren justo, dolore gubergren consetetur magna et ipsum. Aliquyam duo sit takimata lorem. Accusam est diam sed elitr dolore erat no. Invidunt eirmod dolore vero rebum takimata invidunt, elitr clita kasd elitr est. Sed diam voluptua ipsum erat diam erat amet nonumy, kasd clita diam eos sed no stet, ipsum amet ipsum clita lorem lorem dolor dolor, gubergren et dolor stet aliquyam kasd erat, dolor et at kasd consetetur dolor. Sanctus sadipscing sit ut justo sit elitr ut. Invidunt ipsum invidunt at consetetur. Invidunt vero et vero elitr elitr diam justo consetetur. Sed amet est eos magna. Ipsum sed magna sadipscing aliquyam aliquyam. Ipsum magna diam vero diam et et. Dolore dolor ut sed et sadipscing. Diam et rebum amet sanctus rebum, sed voluptua elitr no diam. Dolores aliquyam dolore sanctus et dolores kasd amet voluptua. Sed eos justo et vero. Lorem sed gubergren diam vero dolores. Ipsum erat duo ipsum et dolores no, gubergren sit et erat sanctus elitr elitr takimata eirmod, labore nonumy sea amet gubergren ipsum magna nonumy et, est nonumy kasd stet dolor sed dolores. Labore lorem labore elitr dolores sit, amet aliquyam sed sed et rebum elitr sed sit, sit voluptua dolor dolore est tempor gubergren gubergren elitr sit, est ea takimata tempor erat et lorem. Eos voluptua erat sit voluptua kasd gubergren diam. Aliquyam eos rebum takimata duo tempor vero ipsum, et sea est labore eos. Stet nonumy eos nonumy no duo lorem sea, clita labore erat sed at et. Dolor eos at invidunt amet justo invidunt sit magna vero, labore justo sadipscing erat sit erat ut labore eirmod, sadipscing eos nonumy ut duo amet eirmod et, magna diam lorem sed est dolore. Sit est sed sed.",
// });
// store.messages.appendMessage({
//   user: {
//     name: "Hades God",
//     imageUrl: "https://www.pngitem.com/pimgs/m/570-5708777_reborn-png-photo-katekyo-hitman-reborn-png-transparent.png",
//   },
//   message: "Fermi né nondimeno e che seguitando lodato e seguitando noi.",
// });

// const input_row = ref<number>(1);
const inputText = ref<string>("");
const inputRow = computed(() => {
  const matches = inputText.value.match(/\n/g);
  if (!matches) return 1;
  return matches.length + 1;
});

function onSubmit() {
  // const currentUser: IUser = {
  //   name: "HadesGod",
  //   imageUrl: "https://www.pngitem.com/pimgs/m/570-5708777_reborn-png-photo-katekyo-hitman-reborn-png-transparent.png",
  // };
  // store.messages.appendMessage({
  //   user: currentUser,
  //   message: inputText.value.trim(),
  // });
  if (inputText.value == "") return;
  sendMessage(inputText.value.trim());
  inputText.value = "";
}
function onEnter(event: KeyboardEvent) {
  if (event.key == "Enter" && event.shiftKey == false) {
    onSubmit();
  }
}
/**
 * @description prevent to add \n to textarea will cause add 1 more line before sent msg
 */
function onEnterKeydown(event: KeyboardEvent) {
  if (event.key == "Enter" && event.shiftKey == false) {
    event.preventDefault();
  }
}

async function onClickConnect() {
  await connectMetamaskWallet();
  await enterChatRoom();
}

async function enterChatRoom() {
  const acc = store.account.getAccount.value;
  if (acc && acc.wallet) {
    console.log("conecting...");
    connectWebsocket(acc.wallet);
  }
}

const inputName = ref<string>("");
const inputAvatar = ref<string>("");

async function onChangeNameAndAvatar(): Promise<void> {
  if (inputName.value == "") {
    return;
  }
  changeNameAndAvatar(inputName.value, inputAvatar.value);
}
</script>

<template>
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div> -->
  <div class="container mx-auto mt-10">
    <div class="layout">
      <div class="menu-box bg-gray-100 pt-4 flex flex-col gap-2 px-2">
        <div class="w-full flex justify-center">
          <div v-if="store.websocket.isConnected.value" class="flex items-center gap-3">
            <span class="h-3 w-3 bg-green-400 rounded-full"></span>
            <span>Connected</span>
          </div>

          <div v-else class="flex items-center gap-3">
            <span class="blink h-3 w-3 bg-red-500 rounded-full"></span>
            <span>Disconnected</span>
          </div>
        </div>
        <button
          v-if="!store.account.getAccount.value"
          class="rounded-full px-8 py-2 border-2 border-gray-500 hover:bg-gray-600"
          @click="onClickConnect"
        >
          Connect
        </button>
        <div
          v-else
          class="rounded-full px-8 py-2 border-2 border-gray-500 overflow-ellipsis overflow-hidden hover:bg-gray-300"
        >
          {{ store.account.getShotWalletAddress.value }}...
        </div>
        <button class="rounded-full px-8 py-2 border-2 border-gray-500 hover:bg-gray-300">Create Profile</button>
        <hr class="border-t-4 py-3" />
        <a href="#change-name-avatar" class="rounded-full px-8 py-2 border-2 border-gray-500 hover:bg-gray-300"
          >Change Name and Avatar</a
        >
        <button
          v-if="store.websocket.isConnected.value"
          class="rounded-full px-8 py-2 border-2 border-gray-500 hover:bg-red-100"
          @click="closeWebsocket"
        >
          Exit Chat room
        </button>
        <button v-else class="rounded-full px-8 py-2 border-2 border-gray-500 hover:bg-gray-300" @click="enterChatRoom">
          <span v-if="store.state.websocket.isConnecting" class="btn btn-xs btn-circle loading mr-2"></span>
          <span v-if="!store.state.websocket.isConnecting">Enter Chat room</span>
          <span v-else>Connecting</span>
        </button>
        <button class="rounded-full px-8 py-2 border-2 border-gray-500">Menu 3</button>
      </div>
      <div
        style="scroll-snap-type: none; scrollbar-width: none"
        class="msg-box overflow-auto flex flex-col-reverse p-2"
      >
        <Msg
          v-for="(msg, index) in store.messages.getMessages.value"
          :key="index"
          :account-img-url="
            msg.user.avatar
              ? msg.user.avatar
              : 'https://pbs.twimg.com/profile_images/1364121255264198661/ui7bhUAy_400x400.jpg'
          "
          :account-name="msg.user.screename ? msg.user.screename : 'unknow'"
          :msg="msg.message"
        />
      </div>
      <form class="text-box p-4" @submit.prevent="onSubmit()">
        <div class="border-2 rounded-md pl-5 pr-2 py-1 w-full flex">
          <textarea
            v-model="inputText"
            name="text_field"
            type="text"
            :rows="inputRow"
            style="scroll-snap-type: none"
            class="w-full outline-none resize-none"
            @keyup="onEnter($event)"
            @keydown="onEnterKeydown($event)"
          />
          <div class="flex items-start justify-center">
            <button type="submit">
              <span class="material-icons"> send </span>
            </button>
          </div>
        </div>
      </form>
      <div class="users-box bg-gray-100 overflow-auto pt-4 flex flex-col gap-2 px-2">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 bg-green-500 rounded-full"></span>
          <span class="text-lg font-bold">online users</span>
        </div>
        <hr />
        <div
          v-for="(user, index) in store.chatroom.getAllUsers.value"
          :key="index"
          class="flex flex-row items-center justify-start"
        >
          <img
            :src="user.avatar"
            alt="user-profile"
            width="36"
            height="36"
            style="width: 36px; height: 36px"
            class="rounded-full border-2 flex items-center justify-center"
          />
          <div class="font-bold ml-1 text-left">{{ user.screename }}</div>
        </div>
      </div>
    </div>
  </div>

  <div id="change-name-avatar" class="modal">
    <div class="modal-box">
      <div>
        <div class="form-control">
          <label class="input-group flex">
            <span>Name</span>
            <input v-model="inputName" placeholder="Enter your name" class="input input-bordered w-full" type="text" />
          </label>
          <label class="input-group mt-3">
            <span class="whitespace-nowrap">Profile image</span>
            <input
              v-model="inputAvatar"
              placeholder="Enter your profile url"
              class="input input-bordered w-full"
              type="text"
            />
          </label>
        </div>
      </div>
      <div class="modal-action flex justify-between">
        <a href="#" class="btn">Close</a>
        <a href="#" class="btn bg-gray-500" @click="onChangeNameAndAvatar">OK</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: grid;
  grid-template:
    "menu msg users" 500px
    "menu text users" auto
    / 1fr 2fr 1fr;

  .menu-box {
    grid-area: menu;
  }
  .msg-box {
    grid-area: msg;
  }
  .text-box {
    grid-area: text;
  }
  .users-box {
    grid-area: users;
  }
}

.blink {
  animation: blinker 2s ease-in-out infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
