import Web3 from "web3";
import { getter, mutation } from "../store";

const GETTERS = {
  getWeb3: "getWeb3",
  getAccount: "getAccount",
};

const MUTATIONS = {
  setWeb3: "setWeb3",
  setAccount: "setAccount",
};

export const getWeb3 = getter(GETTERS.getWeb3, (state) => state.web3);

export const setWeb3 = mutation<Web3>(MUTATIONS.setWeb3, (state, web3) => (state.web3 = web3));
