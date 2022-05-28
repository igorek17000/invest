// Components
import { AccountBoard } from "../../components/AccountBoard/AccountBoard";

// CSS
import "./HomePage.css";

// Redux
import { useSelector } from "react-redux";

export function HomePage() {
  const user = useSelector((state) => state.user);
  console.log("homepage line 14, user:", user);
  return (
    <div className="HomePage pageAnimation">
      <h1>Home Page</h1>
      <h4 className="welcome-user">welcome {user.username}</h4>
      <div className="subAccount"></div>
      <AccountBoard />
    </div>
  );
}
