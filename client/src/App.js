// Libraries and Packages
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

// CSS
import "./App.css";

// Components
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { Notifications } from "./components/Notifications/Notifications";

// Pages
import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { SettingsPage } from "./pages/SettingsPage/SettingsPage";
import { LoadingPage } from "./pages/LoadingPage/LoadingPage";

// Functions
import { AppUseEffect } from "./functions/AppUseEffect";
import { qs } from "./functions/functions";

function App() {
  //
  const { user } = useSelector((state) => state);

  //
  useEffect(() => {
    AppUseEffect();
  }, []);

  //
  return (
    <Router>
      <div className="App">
        <LoadingPage />
        <Notifications />
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
