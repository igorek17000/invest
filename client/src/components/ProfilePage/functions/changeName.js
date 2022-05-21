import { updateName } from "../../../redux/userReducer";
import { notify } from "../../../redux/notificationsReducer";
import { axiosConfig, url } from "../../../functions/axiosConfig";
import { loading, stopLoading } from "../../../redux/loadingReducer";
import { store } from "../../../redux/store";

export const ChangeName = (data) => {
  store.dispatch(loading());
  axiosConfig
    .put(url + "/api/user/update/name", data, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
    .then((res) => {
      store.dispatch(stopLoading());
      store.dispatch(
        notify({
          status: "success",
          msg: res.data.msg,
        })
      );
      store.dispatch(updateName(res.data.name));
    })
    .catch((err) => {
      store.dispatch(stopLoading());
      store.dispatch(
        notify({
          status: "error",
          msg: err.response.data.errors,
        })
      );
    });
};
