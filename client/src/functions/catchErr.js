// Redux
import { store } from "../redux/store";

// Reducers
import { stopLoading } from "../redux/loadingReducer";
import { notify } from "../redux/notificationsReducer";

// Functions
import { print } from "../functions/functions";

export const catchErr = (err, msg) => {
  print(err);
  store.dispatch(stopLoading());
  store.dispatch(
    notify({
      status: "error",
      msg: msg || "error, please try again later",
    })
  );
};
