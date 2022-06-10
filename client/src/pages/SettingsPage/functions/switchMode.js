import { qs } from "../../../functions/functions";
import { setCookie } from "../../../functions/cookies";

export const switchMode = (mode) => {
  setCookie(["mode", mode || "light"]);

  const root = qs(":root");
  if (mode === "light") {
    root.style.setProperty("--mode-bg-clr", "#fff");
    root.style.setProperty("--mode-font-clr", "#000");
  } else {
    root.style.setProperty("--mode-bg-clr", "#000d");
    root.style.setProperty("--mode-font-clr", "#fff");
  }
};
