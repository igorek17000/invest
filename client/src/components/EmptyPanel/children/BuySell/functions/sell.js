import { axiosConfiguration } from "../../../../../functions/axiosConfig";
import { setCurrentInvestAccount } from "../../../../../redux/currentInvestAccountReducer";
import { loading, stopLoading } from "../../../../../redux/loadingReducer";
import { notify } from "../../../../../redux/notificationsReducer";
import { closePanel } from "../../../../../redux/panelReducer";
import { store } from "../../../../../redux/store";

export const sell = () => {
  store.dispatch(loading());

  const axiosConfig = axiosConfiguration();
  const item = store.getState().buySellItem;

  axiosConfig
    .post(`/api/user/sell/`, { item: item })
    .then((res) => {
      console.log(res.data.currentAccount);
      store.dispatch(setCurrentInvestAccount(res.data.currentAccount));
      store.dispatch(closePanel());
      store.dispatch(
        notify({
          status: "success",
          msg: "",
        })
      );
      store.dispatch(stopLoading());
    })
    .catch((err) => {
      console.log(err);
      store.dispatch(closePanel());
      store.dispatch(
        notify({
          status: "error",
          msg: err.response.data.errors,
        })
      );
      store.dispatch(stopLoading());
    });
  return;
};
