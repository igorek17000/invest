// Redux
import { store } from "../redux/store";

// Functions
import { axiosConfiguration } from "./axiosConfig";
import { switchMode } from "../pages/SettingsPage/functions/switchMode";

// Reducers Actions
import { loading, stopLoading } from "../redux/loadingReducer";
import { login, logout } from "../redux/userReducer";
import { setCurrentInvestAccount } from "../redux/currentInvestAccountReducer";
import { notify } from "../redux/notificationsReducer";

export const AppUseEffect = async () => {
  store.dispatch(loading());
  const axiosConfig = axiosConfiguration();
  switchMode(localStorage.getItem("mode"));

  axiosConfig
    .get("/api/user/")
    .then((res) => {
      res.data.verified
        ? store.dispatch(
            login({
              username: res.data.username,
              token: localStorage.getItem("token"),
              name: res.data.name,
              mode: res.data.mode || localStorage.getItem("mode"),
              accounts: res.data.accounts,
            })
          )
        : store.dispatch(logout());

      if (res.data.currentAccount) {
        store.dispatch(setCurrentInvestAccount(res.data.currentAccount));
      }
    })
    .then(() => store.dispatch(stopLoading()))
    .catch((err) => {
      store.dispatch(logout());
      store.dispatch(stopLoading());
      store.dispatch(
        notify({
          status: "error",
          msg: err.response.data.errors,
        })
      );
    });
};
