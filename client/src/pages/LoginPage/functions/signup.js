// Redux
import { store } from "../../../redux/store";

// Reducers
import { loading, stopLoading } from "../../../redux/loadingReducer";
import { notify } from "../../../redux/notificationsReducer";
import { login } from "../../../redux/userReducer";

// Functions
import { axiosConfiguration } from "../../../functions/axiosConfig";

export const signup = async (data) => {
  const axiosConfig = axiosConfiguration();

  store.dispatch(loading());
  if (
    data.username === "" ||
    data.password === "" ||
    data.repeat_password === ""
  ) {
    store.dispatch(
      notify({
        status: "error",
        msg: "username, passwords, repeat password can't be empty",
      })
    );
    store.dispatch(stopLoading());
    return console.log("username, passwords, repeat password can't be empty");
  }

  axiosConfig
    .post("/api/user/signup", data)
    .then((res) => {
      const token = res.headers.authorization.split(" ")[1];
      store.dispatch(
        login({
          username: res.data.username,
          token: token,
          mode: "light",
          accounts: res.data.accounts,
        })
      );
      store.dispatch(
        notify({
          status: "success",
          msg: "Signed Up",
        })
      );
      store.dispatch(stopLoading());
    })
    .catch((err) => {
      console.log(err);
      store.dispatch(stopLoading());
      store.dispatch(
        notify({
          status: "error",
          msg: err.response.data.errors,
        })
      );
    });
  return;
};
