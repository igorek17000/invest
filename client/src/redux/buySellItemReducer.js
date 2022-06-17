import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  symbol: "",
  amount: "",
};

const buySellItemSlice = createSlice({
  name: "buySellItem",
  initialState: initialState,
  reducers: {
    setSymbol: (state, action) => {
      return { ...state, symbol: action.payload };
    },
    setAmount: (state, action) => {
      return { ...state, amount: action.payload };
    },
    removeItem: () => {
      return initialState;
    },
  },
});

export const { setSymbol, setAmount, removeItem } = buySellItemSlice.actions;

export default buySellItemSlice.reducer;
