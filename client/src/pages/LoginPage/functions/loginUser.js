// Redux
import { store } from "../../../redux/store";

// Reducers
import { loading, stopLoading } from "../../../redux/loadingReducer";
import { notify } from "../../../redux/notificationsReducer";
import { login } from "../../../redux/userReducer";

// Functions
import { print } from "../../../functions/functions";
import { axiosConfiguration } from "../../../functions/axiosConfig";

export const loginUser = async (data) => {
  const axiosConfig = axiosConfiguration();
  store.dispatch(loading());
  if (data.username === "" || data.password === "") {
    store.dispatch(stopLoading());
    store.dispatch(
      notify({ status: "error", msg: "username, passwords can't be empty" })
    );
    return console.log("username and passwords can't be empty");
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

        store.dispatch(stopLoading());
        store.dispatch(notify({ status: "success", msg: "Logged in" }));
      } catch (err) {
        print(err);
        store.dispatch(stopLoading());
        store.dispatch(
          notify({
            status: "error",
            msg: err,
          })
        );
      }
    })
    .catch((err) => {
      print(err.response);
      store.dispatch(stopLoading());
      store.dispatch(
        notify({
          status: "error",
          msg: err,
        })
      );
    });
};
