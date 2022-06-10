// Redux
import { store } from "../../../redux/store";

// Reducers
import { loading, stopLoading } from "../../../redux/loadingReducer";
import { notify } from "../../../redux/notificationsReducer";
import { login } from "../../../redux/userReducer";

// Functions
import { print } from "../../../functions/functions";
import { axiosConfiguration } from "../../../functions/axiosConfig";
import { setCurrentInvestAccount } from "../../../redux/currentInvestAccountReducer";

// Helpers Functions
import { catchErr } from "../../../functions/catchErr";

export const loginUser = async (data) => {
  const axiosConfig = axiosConfiguration();
  store.dispatch(loading());

  if (data.username === "" || data.password === "") {
    catchErr("err", "username and passwords can't be empty");
  }
  axiosConfig
    .post("/api/user/login", data)
    .then((res) => {
      print("login page line 34, res:", res);
      try {
        const token = res.headers.authorization.split(" ")[1];
        store.dispatch(
          login({
            username: res.data.username,
            token: token,
            name: res.data.name,
            mode: res.data.mode,
            accounts: res.data.accounts,
          })
        );

        if (res.data.currentAccount) {
          store.dispatch(setCurrentInvestAccount(res.data.currentAccount));
        }

        store.dispatch(notify({ status: "success", msg: "Logged in" }));
        store.dispatch(stopLoading());
      } catch (err) {
        // catchErr(err);
        store.dispatch(stopLoading());
      }
    })
    .catch((err) => {
      catchErr(err);
    });
};
