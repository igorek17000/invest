// Libraries and Packages
import { Link } from "react-router-dom";

// style
import "./Navbar.css";

// imgs
import logo from "../Menu/profilePicture.svg";

// components
import Menu from "../Menu/Menu.js";

// Redux
import { useSelector } from "react-redux";

export function Navbar() {
  const { user } = useSelector((state) => state);
  const elem = user.isLoggedIn ? (
    <Menu />
  ) : (
    <a href="/login">
      <button className="signinLink">Login</button>
    </a>
  );
  return (
    <nav>
      {elem}
      <h1>Meow</h1>
      <Link to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>
    </nav>
  );
}
