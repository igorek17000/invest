// Redux
import { store } from "../redux/store";

// Functions
import { axiosConfiguration } from "./axiosConfig";
import { switchMode } from "../pages/SettingsPage/functions/switchMode";

// Reducers Actions
import { loading, stopLoading } from "../redux/loadingReducer";
import { login, logout } from "../redux/userReducer";

export const AppUseEffect = async () => {
  store.dispatch(loading());
  const axiosConfig = axiosConfiguration();
  switchMode(localStorage.getItem("mode"));

  axiosConfig
    .get("/api/user/")
    .then((res) =>
      res.data.verified
        ? store.dispatch(
            login({
              username: res.data.username,
              token: localStorage.getItem("token"),
              name: res.data.name,
              mode: res.data.mode || localStorage.getItem("mode"),
              accounts:
                res.data.accounts ||
                localStorage.getItem("accounts").split(" "),
            })
          )
        : store.dispatch(logout())
    )
    .then(() => store.dispatch(stopLoading()))
    .catch((err) => {
      store.dispatch(logout());
      store.dispatch(stopLoading());
    });
};
