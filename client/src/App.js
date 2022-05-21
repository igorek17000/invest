// Libraries and Packages
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

// import logo from './logo.svg';

// CSS
import "./App.css";
import "./GlobalVars.css";

// Functions
import { qs, switchMode, print } from "./functions/functions";
import { axiosConfig } from "./functions/axiosConfig";
import { url } from "./functions/axiosConfig";

// components
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { Notifications } from "./components/Notifications/Notifications";

// Pages
import { HomePage } from "./components/HomePage/HomePage";
import { LoginPage } from "./components/LoginPage/LoginPage";
import { ProfilePage } from "./components/ProfilePage/ProfilePage";
import { SettingsPage } from "./components/SettingsPage/SettingsPage";
import { LoadingPage } from "./components/LoadingPage/LoadingPage";

// Reducers Actions
import { loading as loadingReducer, stopLoading } from "./redux/loadingReducer";
import { login, logout } from "./redux/userReducer";

function App() {
  // states variables and functions
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state);
  const { user } = useSelector((state) => state);
  const { notifications } = useSelector((state) => state);

  console.log(notifications);

  //
  useEffect(() => {
    dispatch(loadingReducer());
    switchMode(localStorage.getItem("mode"));

    axiosConfig
      .get(url + "/api/user/")
      .then(
        (res) => (
          console.log(res),
          res.data.verified
            ? dispatch(
                login({
                  username: res.data.username,
                  token: localStorage.getItem("token"),
                  name: res.data.name,
                  mode: res.data.mode || localStorage.getItem("mode"),
                })
              )
            : dispatch(logout()),
          dispatch(stopLoading())
        )
      )
      .catch((err) => {
        dispatch(logout());
        dispatch(stopLoading());
      });
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Loading page */}
        {loading.isLoading ? <LoadingPage /> : ""}
        {/* Notifications  */}
        {notifications.isNotification ? <Notifications /> : ""}
        <Navbar />
        <div
          className="PageWrapper" // console.log(token);
          onClick={() => qs(".MenuWrapper").classList.remove("show-menu")}
        >
          <Routes>
            <Route
              exact
              path="/"
              element={
                user.isLoggedIn ? <HomePage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/login"
              element={user.isLoggedIn ? <Navigate to="/" /> : <LoginPage />}
            />
            <Route
              path="/profile"
              element={
                user.isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/settings"
              element={
                user.isLoggedIn ? <SettingsPage /> : <Navigate to="/login" />
              }
            />
            <Route path="*" element="404, Page Not Found" />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
