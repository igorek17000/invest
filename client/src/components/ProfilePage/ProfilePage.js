// Libraries and Packages
import { useState } from "react";

// CSS
import "./Profile.css";
import "../../GlobalVars.css";

// Functions
import { qsac } from "../../functions/functions";
import { handleSubmitName, handleCancelSubmitName } from "./functions/helpers";

//
import ProfilePicture from "../Navbar/Menu/profilePicture.svg";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Reducer
import { SubmitBtns } from "../SubmitBtns/SubmitBtns";

export const ProfilePage = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="ProfilePage">
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
          {/* <button
            className="submit"
            onClick={() => {
              
            }}
          >
            _/
          </button>
          <button
            className="cancel"
            onClick={() => }
          >
            x
          </button> */}
        </div>
      </div>
    </div>
  );
};
