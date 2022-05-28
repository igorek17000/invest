import { store } from "../../../redux/store";
import { axiosConfiguration } from "../../../functions/axiosConfig";
import { loading, stopLoading } from "../../../redux/loadingReducer";
import { notify } from "../../../redux/notificationsReducer";
import { updateMode } from "../../../redux/userReducer";

export const ChangeMode = (data) => {
  const axiosConfig = axiosConfiguration();
  store.dispatch(loading());
  axiosConfig
    .put("/api/user/update/mode", data, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
    .then((res) => {
      console.log(res.data);
      store.dispatch(updateMode(data.mode));
      store.dispatch(stopLoading());
      store.dispatch(
        notify({
          status: "success",
          msg: `Mode changed: ${data.mode}`,
        })
      );
    })
    .catch((err) => {
      store.dispatch(stopLoading());
      store.dispatch(
        notify({
          status: "error",
          msg: err,
        })
      );
    });
};
