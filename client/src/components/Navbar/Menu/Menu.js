// Libraries and Packages
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// CSS
import "./Menu.css";

//
import ProfilePicture from "./profilePicture.svg";

// react icons
import { AiOutlineMenu } from "react-icons/ai";

// functions
import { qs } from "../../../functions/functions";

// Reducers
import { logout } from "../../../redux/userReducer";

export default function Menu() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  return (
    <div className="MenuWrapper">
      <ul className="menu">
        <img src={ProfilePicture} alt="img" />
        <h5>{user.name}</h5>
        <h6>@{user.username}</h6>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/profile">
          <li>Profile</li>
        </Link>
        <Link to="/settings">
          <li>Setting</li>
        </Link>
        <li onClick={() => dispatch(logout())}>Logout</li>
      </ul>
      <span
        className="menu-btn"
        onClick={(e) => (
          e.preventDefault, qs(".MenuWrapper").classList.toggle("show-menu")
        )}
      >
        <AiOutlineMenu size="1.4em" />
      </span>
    </div>
  );
}
