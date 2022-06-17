// Functions
import { axiosConfiguration } from "../../../../../functions/axiosConfig";
import { print } from "../../../../../functions/functions";

// Redux
import { store } from "../../../../../redux/store";
import { notify } from "../../../../../redux/notificationsReducer";
import { loading, stopLoading } from "../../../../../redux/loadingReducer";
import { removeCurrentInvestAccount } from "../../../../../redux/currentInvestAccountReducer";
import { updateAccounts } from "../../../../../redux/userReducer";
import { closePanel } from "../../../../../redux/panelReducer";

export const confirmDeleteInvestAccount = () => {
  store.dispatch(loading());

  const axiosConfig = axiosConfiguration();
  const { id, name } = store.getState().currentInvestAccount;
  // print(id);
  axiosConfig
    .delete(`/api/user/investAccount/${id}`)
    .then((res) => {
      store.dispatch(updateAccounts(res.data.accounts));
    })
    .then(() => {
      store.dispatch(removeCurrentInvestAccount());
    })
    .then(() => {
      store.dispatch(
        notify({
          status: "success",
          msg: `${name} is deleted successfuly`,
        })
      );
    })
    .then(() => {
      store.dispatch(closePanel());
    })
    .then(() => {
      store.dispatch(stopLoading());
    })
    .catch((err) => {
      print(err);
      store.dispatch(
        notify({
          status: "error",
          msg: "",
        })
      );
      store.dispatch(stopLoading());
    });
};
