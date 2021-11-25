import { IUser } from "../types";

import { getter, mutation } from "../store";

const GETTERS = {
  getAccount: "getAccount",
  getShortWalletAccount: "getShortWalletAccount",
};

const MUTATIONS = {
  setAccount: "setAccount",
};

export const getAccount = getter(GETTERS.getAccount, (state) => state.account);
export const getShotWalletAddress = getter(GETTERS.getShortWalletAccount, (state) => {
  if (state.account && state.account.wallet) {
    return state.account?.wallet.slice(0, 11);
  }
  return "unknow wallet address";
});

export const setAccount = mutation<IUser | undefined>(
  MUTATIONS.setAccount,
  (state, account) => (state.account = account)
);
