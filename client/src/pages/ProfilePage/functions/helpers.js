import { qs, qsiv, qsrc } from "../../../functions/functions";
import { setCookie } from "../../../functions/cookies";
import { ChangeName } from "./changeName";
// import { useSelector } from "react-redux";
import { store } from "../../../redux/store";

export const handleSubmitName = () => {
  const name = qsiv(".ProfilePage .name");
  qsrc(".ProfilePage .SubmitBtns", "show");
  ChangeName({ name: name });
  setCookie("name", name);
};

export const handleCancelSubmitName = () => {
  const { user } = store.getState();
  console.log(user, store);
  qsrc(".ProfilePage .SubmitBtns", "show");
  qs(".ProfilePage .name").value = user.name || "";
};
