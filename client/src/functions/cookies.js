import { switchMode } from "../pages/SettingsPage/functions/switchMode";

export const setCookie = (...args) => {
  for (let arg in args) {
    //                   item        , value
    localStorage.setItem(args[arg][0], args[arg][1]);
  }
};

export const deleteCookies = () => {
  localStorage.setItem("mode", "light");
  switchMode("light");

  const items = ["username", "token", "name", "accounts"];
  for (let item in items) {
    localStorage.removeItem(items[item]);
  }
};
