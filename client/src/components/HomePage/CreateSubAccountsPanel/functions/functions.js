import { print } from "../../../../functions/functions";
import { store } from "../../../../redux/store";
import { selectSubAccountType } from "../../../../redux/createSubAccountReducer";

export const handleSubAccountClick = (e) => {
  const type = e.target.innerText;
  if (type === "Crypto" || type === "Stocks") {
    store.dispatch(selectSubAccountType(type));
  }
};
