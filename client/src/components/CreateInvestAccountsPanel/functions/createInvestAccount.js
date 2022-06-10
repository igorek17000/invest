import { axiosConfiguration } from "../../../functions/axiosConfig";
import { qsiv, qsrc } from "../../../functions/functions";
import { unselectInvestAccount } from "../../../redux/createInvestAccountReducer";
import { notify } from "../../../redux/notificationsReducer";
import { store } from "../../../redux/store";
import { updateAccounts } from "../../../redux/userReducer";
import { setCurrentInvestAccount } from "../../../redux/currentInvestAccountReducer";

export const createInvestAccount = () => {
  const axiosConfig = axiosConfiguration();
  axiosConfig
    .post(
      `/api/user/investAccount/${store.getState().selectInvestAccount.type}`,
      { accountName: qsiv(".accountName") },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
    .then((res) => {
      store.dispatch(updateAccounts(res.data.accounts));
      store.dispatch(setCurrentInvestAccount(res.data.currentAccount));
      store.dispatch(
        notify({
          msg: res.data.msg,
          status: "success",
        })
      );
    })
    .catch((err) => {
      console.error(err);
      store.dispatch(
        notify({
          msg:
            err.response.data.error ||
            "couldn't create new sub account, please try again later",
          status: "error",
        })
      );
    });

  store.dispatch(unselectInvestAccount());
  //   qsrc(".submitBtns .SubmitBtns", "show");
  qsrc(".EmptyPanel", "show");
};
