import { axiosConfig } from "../../../../functions/axiosConfig";
import { qsrc } from "../../../../functions/functions";
import { unselectSubAccount } from "../../../../redux/createSubAccountReducer";
import { notify } from "../../../../redux/notificationsReducer";
import { store } from "../../../../redux/store";
export const createSubAccount = () => {
  axiosConfig
    .post(`/api/user/subaccount/${store.getState().selectSubAccount.type}`)
    .then((res) =>
      store.dispatch(
        notify({
          msg: res.data.msg,
          status: "success",
        })
      )
    )
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
  qsrc(".submitBtns .SubmitBtns", "show");
};
