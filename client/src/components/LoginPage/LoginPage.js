// Libraries and Packages
import { useState } from "react";
// import axios from "axios";
import { useDispatch } from "react-redux";

// CSS
import "./LoginPage.css";

// Functions
import { qsiv, print } from "../../functions/functions";
import { axiosConfig } from "../../functions/axiosConfig";

// Constant
// import { url } from "../../functions/axiosConfig";

// Reducers
import { loading, stopLoading } from "../../redux/loadingReducer";
import { login } from "../../redux/userReducer";
import { notify, closeNotify } from "../../redux/notificationsReducer";

export function LoginPage() {
  const dispatch = useDispatch();

  async function loginUser(data) {
    dispatch(loading());
    if (data.username === "" || data.password === "") {
      dispatch(stopLoading());
      dispatch(
        notify({ status: "error", msg: "username, passwords can't be empty" })
      );
      return console.log("username and passwords can't be empty");
    }
    axiosConfig
      .post("/api/user/login", data)
      .then((res) => {
        print("login page line 34, res:", res);
        try {
          const token = res.headers.authorization.split(" ")[1];
          dispatch(
            login({
              username: res.data.username,
              token: token,
              name: res.data.name || "",
              mode: res.data.mode || true,
            })
          );

          // if it work which i hope, i try to dispatch it from the login reducer
          // fuck, it didn't work
          dispatch(stopLoading());
          dispatch(notify({ status: "success", msg: "Logged in" }));
        } catch (err) {
          print(err);
          dispatch(stopLoading());
          dispatch(
            notify({
              status: "error",
              msg: err.response.data.errors,
            })
          );
        }
      })
      .catch((err) => {
        print(err.response);
        dispatch(stopLoading());
        dispatch(
          notify({
            status: "error",
            msg: err.response.data.errors,
          })
        );
      });
    return;
  }

  const signup = async (data) => {
    dispatch(loading());

    if (
      data.username === "" ||
      data.password === "" ||
      data.repeat_password === ""
    ) {
      dispatch(
        notify({
          status: "error",
          msg: "username, passwords, repeat password can't be empty",
        })
      );
      dispatch(stopLoading());
      return console.log("username, passwords, repeat password can't be empty");
    }

    axiosConfig
      .post("/api/user/signup", data)
      .then((res) => {
        const token = res.headers.authorization.split(" ")[1];
        dispatch(
          login({
            username: res.data.username,
            token: token,
            name: res.data.name,
            mode: "light",
          })
        );
        dispatch(
          notify({
            status: "success",
            msg: "Signed Up",
          })
        );
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
        dispatch(
          notify({
            status: "error",
            msg: err.response.data.errors,
          })
        );
      });
    return;
  };

  return (
    <div className="LoginPage flex">
      <form className="LoginForm form">
        <fieldset className="flex">
          <legend>Login</legend>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" className="username" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" className="password" />
          <button
            onClick={(e) => {
              e.preventDefault();
              loginUser({
                username: qsiv(".LoginForm .username"),
                password: qsiv(".LoginForm .password"),
              });
            }}
          >
            Login
          </button>
        </fieldset>
      </form>
      <form className="signupForm form">
        <fieldset className="flex">
          <legend>Sign Up</legend>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" className="username" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" className="password" />
          <label htmlFor="repeat_password">Repeat_Password</label>
          <input
            type="password"
            name="repeat_password"
            className="repeat_password"
          />

          <button
            onClick={(e) => {
              e.preventDefault();
              signup({
                username: qsiv(".signupForm .username"),
                password: qsiv(".signupForm .password"),
                repeat_password: qsiv(".signupForm .repeat_password"),
              });
            }}
          >
            Sign up
          </button>
        </fieldset>
      </form>
    </div>
  );
}
