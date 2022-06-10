import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./loadingReducer";
import notificationsReducer from "./notificationsReducer";
import userReducer from "./userReducer";
import selectInvestAccountReducer from "./createInvestAccountReducer";
import currentInvestAccountSlice from "./currentInvestAccountReducer";
import panelReducer from "./panelReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    panel: panelReducer,
    loading: loadingReducer,
    notifications: notificationsReducer,
    selectInvestAccount: selectInvestAccountReducer,
    currentInvestAccount: currentInvestAccountSlice,
  },
});
