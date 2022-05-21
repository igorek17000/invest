import { createSlice } from "@reduxjs/toolkit";

const selectSubAccountSlice = createSlice({
  name: "selectSubAccount",
  initialState: {
    isSelected: false,
    type: "",
  },
  reducers: {
    selectSubAccountType: (state, action) => {
      return {
        isSelected: true,
        type: action.payload,
      };
    },
    unselectSubAccount: () => {
      return { isSelected: false, value: "" };
    },
  },
});

export const { selectSubAccountType, unselectSubAccount } =
  selectSubAccountSlice.actions;

export default selectSubAccountSlice.reducer;
