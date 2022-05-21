// // close the processing display with the esc button
// document.addEventListener("keydown", (e) => {
//   console.log(e);
//   // eslint-disable-next-line no-unused-expressions
//   e.keyCode === 27 ? dispatch(stopLoading) : "";
// });

import { switchMode } from "./functions";

export const setCookie = (...args) => {
  for (let arg in args) {
    //                   item        , value
    localStorage.setItem(args[arg][0], args[arg][1]);
  }
};

export const deleteCookies = () => {
  localStorage.setItem("mode", "light");
  switchMode("light");

  const items = ["username", "token", "name"];
  for (let item in items) {
    localStorage.removeItem(items[item]);
  }
};
