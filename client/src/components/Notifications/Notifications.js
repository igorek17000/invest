// CSS
import "./Notifications.css";

import { useSelector } from "react-redux";
import { NotificationsCloseBtn } from "./NotificationsCloseBtn";

export const Notifications = () => {
  const { status, msg } = useSelector((state) => state.notifications);
  const color = status === "success" ? "green" : "red";
  const style = {
    border: `.2rem solid ${color}`,
    boxShadow: `0 0 0.4rem ${color}`,
  };
  return (
    <div className="Notifications" style={style}>
      <div className="msg">{msg}</div> <NotificationsCloseBtn />
    </div>
  );
};
