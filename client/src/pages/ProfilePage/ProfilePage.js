// CSS
import "./Profile.css";

// Functions
import { qsac } from "../../functions/functions";
import { handleSubmitName, handleCancelSubmitName } from "./functions/helpers";

//
import ProfilePicture from "../../components/Menu/profilePicture.svg";

// Redux
import { useSelector } from "react-redux";

// Reducer
import { SubmitBtns } from "../../components/SubmitBtns/SubmitBtns";

export const ProfilePage = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="ProfilePage pageAnimation">
      <img src={ProfilePicture} alt="profile" className="profilePicture" />
      <div className="profileSubContainer">
        <div className="username inputWrapper">
          <label htmlFor="username">Username:</label>
          <input type="text" className="username" value={user.username} />
        </div>
        <div className="editName inputWrapper">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="name"
            defaultValue={user.name || ""}
            onChange={() => qsac(".ProfilePage .SubmitBtns", "show")}
          />
        </div>
        <div className="btns">
          <SubmitBtns
            submit={handleSubmitName}
            cancel={handleCancelSubmitName}
          />
        </div>
      </div>
    </div>
  );
};
