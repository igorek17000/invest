// Global Constants
import { axiosConfig, url } from "./axiosConfig";

// Functions
import { setCookie } from "./helpers";

// query selector and query selector all
export function qs(elem) {
  return document.querySelector(elem);
}
export function qsa(elem) {
  return document.querySelectorAll(elem);
}

// query selector with specific options
export function qsiv(elem) {
  return qs(elem).value;
}

export function qsac(elem, classs) {
  return qs(elem).classList.add(classs);
}

export function qsrc(elem, classs) {
  return qs(elem).classList.remove(classs);
}

export function qstc(elem, classs) {
  return qs(elem).classList.toggle(classs);
}
// check user mode
export const switchMode = (mode) => {
  // print(mode);
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

export const print = (desc = "", value = "") => console.log(desc, value);

// make a get request to the server to check the validation of the token if any
// export function validateToken(props) {
//   axiosConfig
//     .get(url + "/api/user/")
//     .then(
//       (res) => (
//         console.log(res.data.verified),
//         res.data.verified
//           ? props.setIsLoggedIn(true)
//           : props.setIsLoggedIn(false)
//       )
//     )
//     .catch((err) => {
//       logout(props.setIsLoggedIn());
//       getErr(err);
//     });
// }

// Logout user
// export function logout(props) {
//   localStorage.removeItem("username");
//   localStorage.removeItem("token");
//   // document.cookie = "token=; maxAge=0;";
//   props.setIsLoggedIn(false);
// }

// FiSun
