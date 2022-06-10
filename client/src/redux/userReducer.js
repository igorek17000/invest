// Libraries and Packages
import { createSlice } from "@reduxjs/toolkit";

// Functions
import { setCookie, deleteCookies } from "../functions/cookies";
import { print } from "../functions/functions";
import { switchMode } from "../pages/SettingsPage/functions/switchMode";

const initialState = {
  isLoggedIn: false,
  username: "",
  token: "",
  name: "",
  mode: "light",
  accounts: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      const { username, token, name, mode, accounts } = action.payload;

      // Check the length of the accounts before using the .map function.
      const cookieAccounts = accounts.map((elem) => elem.name).join(",");
      // : accounts.length === 1
      // ? accounts[0].name
      // : [];

      print("userReducer line 26: ", mode);
      switchMode(mode);
      setCookie(
        ["username", username],
        ["token", token],
        ["name", name],
        ["mode", mode],
        ["accounts", cookieAccounts]
      );
      return {
        isLoggedIn: true,
        username: username,
        token: token,
        name: name || "",
        mode: mode || "light",
        accounts: accounts || [],
      };
    },
    logout: () => {
      console.log("logging out");
      deleteCookies();
      switchMode("light");
      return { initialState };
    },
    updateName: (state, action) => {
      setCookie(["name", action.payload]);
      console.log(state);
      return { ...state, name: action.payload };
    },
    updateMode: (state, action) => {
      console.log(action.payload);
      switchMode(action.payload);
      return { ...state, mode: action.payload };
    },
    updateAccounts: (state, action) => {
      setCookie(["accounts", action.payload]);
      return {
        ...state,
        accounts: action.payload,
      };
    },
  },
});

export const { login, logout, updateName, updateMode, updateAccounts } =
  userSlice.actions;
export default userSlice.reducer;
