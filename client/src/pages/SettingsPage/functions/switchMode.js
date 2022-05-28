import { qs } from "../../../functions/functions";
import { setCookie } from "../../../functions/cookies";

export const switchMode = (mode) => {
  setCookie(["mode", mode]);

  const root = qs(":root");
  if (mode === "light") {
    root.style.setProperty("--bg-clr", "#fff");
    root.style.setProperty("--font-clr", "#000");
  } else {
    root.style.setProperty("--bg-clr", "#000d");
    root.style.setProperty("--font-clr", "#fff");
  }
};
