import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNotification: false,
  status: "",
  msg: "",
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: initialState,
  reducers: {
    notify: (state, action) => {
      const { status, msg } = action.payload;
      return {
        isNotification: true,
        status: status,
        msg: msg
          ? msg
          : status === "success"
          ? "Success"
          : "Error, please try again",
      };
    },

    closeNotify: () => {
      return initialState;
    },
  },
});

export const { notify, closeNotify } = notificationsSlice.actions;

export default notificationsSlice.reducer;
