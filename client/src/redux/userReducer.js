// Libraries and Packages
import { createSlice } from "@reduxjs/toolkit";

// Functions
import { setCookie, deleteCookies } from "../functions/helpers";
import { print, switchMode } from "../functions/functions";

// const username = localStorage.getItem("username");
// const name = localStorage.getItem("name") || " ";

const initialState = {
  isLoggedIn: false,
  username: "",
  token: "",
  name: "",
  mode: "light",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    // register: (state) => {},
    login: (state, action) => {
      const { username, token, name, mode } = action.payload;
      print("userReducer line 26: ", mode);
      switchMode(mode);
      setCookie(
        ["username", username],
        ["token", token],
        ["name", name],
        ["mode", mode || "light"]
      );
      return {
        isLoggedIn: true,
        username: username,
        token: token,
        name: name || "",
        mode: mode || "light",
      };
    },
    logout: () => {
      console.log("logging out");
      deleteCookies();
      switchMode("light");
      return { initialState };
    },
    updateName: (state, action) => {
      console.log(state);
      return { ...state, name: action.payload };
    },
    updateMode: (state, action) => {
      console.log(action.payload);
      switchMode(action.payload);
      return { ...state, mode: action.payload };
    },
  },
});

export const { login, logout, updateName, updateMode } = userSlice.actions;
export default userSlice.reducer;
