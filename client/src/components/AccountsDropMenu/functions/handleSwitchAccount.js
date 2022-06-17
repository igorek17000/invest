import { print, qs } from "../../../functions/functions";
import { axiosConfiguration } from "../../../functions/axiosConfig";
import { store } from "../../../redux/store";
import { setCurrentInvestAccount } from "../../../redux/currentInvestAccountReducer";
import { notify } from "../../../redux/notificationsReducer";

export const handleSwitchAccount = (id) => {
  const axiosConfig = axiosConfiguration();
  // reset the menu scroll bar
  qs(".AccountsDropMenu").scrollTo(0, 0);
  print("reset the scroll-bar for the account drop menu");
  axiosConfig
    .get(`/api/user/investAccount/${id}`)
    .then((res) => {
      print(res.data);
      store.dispatch(setCurrentInvestAccount(res.data));
    })
    .catch((err) => {
      print(err);
      store.dispatch(
        notify({
          status: "error",
          msg: "",
        })
      );
    });
};
