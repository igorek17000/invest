import { createSlice } from "@reduxjs/toolkit";
import { setCookie } from "../functions/cookies";

const initialState = {
  isCurrentAccount: false,
  id: "",
  name: "",
  cash: "",
  history: [],
};

const currentInvestAccountSlice = createSlice({
  name: "currentAccount",
  initialState: initialState,
  reducers: {
    setCurrentInvestAccount: (state, action) => {
      const currentAccount = action.payload;

      setCookie(["currentAccount", currentAccount._id]);
      return {
        isCurrentAccount: true,
        id: currentAccount._id,
        name: currentAccount.name,
        cash: currentAccount.cash,
        history: currentAccount.history || [],
      };
    },
    removeCurrentInvestAccount: () => {
      return initialState;
    },
  },
});

export const { setCurrentInvestAccount, removeCurrentInvestAccount } =
  currentInvestAccountSlice.actions;

export default currentInvestAccountSlice.reducer;
