import { createSlice } from "@reduxjs/toolkit";

const selectInvestAccountSlice = createSlice({
  name: "selectInvestAccount",
  initialState: {
    isSelected: false,
    type: "",
  },
  reducers: {
    selectInvestAccountType: (state, action) => {
      return {
        isSelected: true,
        type: action.payload,
      };
    },
    unselectInvestAccount: () => {
      return { isSelected: false, value: "" };
    },
  },
});

export const { selectInvestAccountType, unselectInvestAccount } =
  selectInvestAccountSlice.actions;

export default selectInvestAccountSlice.reducer;
