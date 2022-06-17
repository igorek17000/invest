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
import { qs } from "../../functions/functions";

// Reducers
import { logout } from "../../redux/userReducer";
import { MenuLi } from "./MenuLi";
import { removeCurrentInvestAccount } from "../../redux/currentInvestAccountReducer";

export default function Menu() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const menuElems = ["Home", "Profile", "Settings"];

  return (
    <div className="MenuWrapper">
      <ul className="menu">
        <img src={ProfilePicture} alt="img" />
        <h5>{user.name}</h5>
        <h6>@{user.username}</h6>
        {menuElems.map((elem) => (
          <Link to={elem === "Home" ? "/" : elem}>
            <li>
              <MenuLi menuLi={elem} />
            </li>
          </Link>
        ))}

        <li
          onClick={() => {
            dispatch(removeCurrentInvestAccount());
            dispatch(logout());
          }}
        >
          <MenuLi menuLi="Logout" />
        </li>
      </ul>
      <span
        className="menu-btn"
        onClick={(e) => {
          e.preventDefault();
          qs(".MenuWrapper").classList.toggle("show-menu");
        }}
      >
        <AiOutlineMenu size="1.4em" />
      </span>
    </div>
  );
}
