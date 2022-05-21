// CSS
import "./Notifications.css";
import "../../GlobalVars.css";

// Redux
import { useDispatch } from "react-redux";

// Reducers
import { closeNotify } from "../../redux/notificationsReducer";

// Functions
import { qsac } from "../../functions/functions";

export const NotificationsCloseBtn = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    qsac(".Notifications", "swipeUp");
    setTimeout(() => dispatch(closeNotify()), 800);
  };
  return (
    <div
      className="notificationsCloseBtn closeBtn btn"
      onClick={() => handleClick()}
    ></div>
  );
};
