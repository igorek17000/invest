import { axiosConfiguration } from "../../../functions/axiosConfig";
import { qsiv, qsrc } from "../../../functions/functions";
import { unselectSubAccount } from "../../../redux/createSubAccountReducer";
import { notify } from "../../../redux/notificationsReducer";
import { store } from "../../../redux/store";
import { updateAccounts } from "../../../redux/userReducer";

export const createSubAccount = () => {
  const axiosConfig = axiosConfiguration();
  axiosConfig
    .post(
      `/api/user/subaccount/${store.getState().selectSubAccount.type}`,
      { accountName: qsiv(".accountName") },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
    .then((res) => {
      store.dispatch(updateAccounts(res.data.accounts));
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

  store.dispatch(unselectSubAccount());
  //   qsrc(".submitBtns .SubmitBtns", "show");
  qsrc(".CreateSubAccountPanel", "show");
};
