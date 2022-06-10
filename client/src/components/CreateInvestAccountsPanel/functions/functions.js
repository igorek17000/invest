import { store } from "../../../redux/store";
import { selectInvestAccountType } from "../../../redux/createInvestAccountReducer";

export const handleInvestAccountClick = (e) => {
  const type = e.target.innerText;
  if (type === "Crypto" || type === "Stocks") {
    store.dispatch(selectInvestAccountType(type));
  }
};
