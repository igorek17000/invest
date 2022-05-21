import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./loadingReducer";
import notificationsReducer from "./notificationsReducer";
import userReducer from "./userReducer";
import selectSubAccountReducer from "./createSubAccountReducer";

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    user: userReducer,
    notifications: notificationsReducer,
    selectSubAccount: selectSubAccountReducer,
  },
});
