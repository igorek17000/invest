import { store } from "../../../../redux/store";
import { closePanel } from "../../../../redux/panelReducer";

export const defualtCancelSubmitBtn = () => {
  store.dispatch(closePanel());
};
