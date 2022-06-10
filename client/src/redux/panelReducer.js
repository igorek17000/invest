import { createSlice } from "@reduxjs/toolkit";
import { print } from "../functions/functions";

const initialState = {
  isPanel: false,
  type: "",
};

const panelSlice = createSlice({
  name: "panel",
  initialState: initialState,
  reducers: {
    getPanel: (state, action) => {
      return {
        isPanel: true,
        type: action.payload,
      };
    },

    closePanel: () => {
      return initialState;
    },
  },
});

export const { getPanel, closePanel } = panelSlice.actions;

export default panelSlice.reducer;
