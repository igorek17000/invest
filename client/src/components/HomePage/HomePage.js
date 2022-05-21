// Libraries and Packages

// CSS
import "./HomePage.css";

// Redux
import { useSelector } from "react-redux";

// Functions
import { print, qsac } from "../../functions/functions.js";
import { CreateSubAccountPanel } from "./CreateSubAccountsPanel/CreateSubAccountsPanel";

export function HomePage() {
  const user = useSelector((state) => state.user);
  console.log("homepage line 14, user:", user);
  return (
    <div className="HomePage">
      <h1>Home Page</h1>
      <h4 className="welcome-user">welcome {user.username}</h4>
      <div className="subAccount">
        <button
          className="toggleCreateSubAccountOption btn"
          onClick={() => qsac(".CreateSubAccountPanel", "show")}
        >
          New Sub Account +
        </button>
        <CreateSubAccountPanel />
      </div>
    </div>
  );
}
