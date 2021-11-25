import { createStore } from "@harlem/core";
import { STATE } from "./state";

export const { state, getter, mutation, ...store } = createStore("app", STATE);
