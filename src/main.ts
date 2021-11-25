import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import store from './store'
import Harlem from "@harlem/core";
import devtoolsPlugin from "@harlem/plugin-devtools";
// Tailwind css
import "./assets/tailwind.css";

createApp(App)
  .use(Harlem, {
    plugins: [devtoolsPlugin({ label: "Harlem-State" })],
  })
  .use(router)
  .mount("#app");
