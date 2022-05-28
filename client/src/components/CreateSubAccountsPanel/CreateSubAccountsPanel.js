// CSS
import "../../GlobalVars.css";
import "./CreateSubAccountPanel.css";

// Functions
import { qsrc, qsac } from "../../functions/functions";
import { createSubAccount } from "./functions/createSubAccount";

// Redux
import { store } from "../../redux/store";

// Components
import { SubAccount } from "./SubAccount";
import { SubmitBtns } from "../SubmitBtns/SubmitBtns";

export const CreateSubAccountPanel = () => {
  const isSelected = store.getState().selectSubAccount.isSelected;
  // eslint-disable-next-line no-unused-expressions
  isSelected ? qsac(".accountNameWrapper", "show") : "";
  return (
    <div className="CreateSubAccountPanel flex">
      <div className="accounts flex row ">
        <SubAccount type={"Crypto"} />
        <SubAccount type={"Stocks"} />
        <button
          className="CreateSubAccountCloseBtn closeBtn btn"
          onClick={() => qsrc(".CreateSubAccountPanel", "show")}
        ></button>
      </div>
      <div className="accountNameWrapper">
        <label htmlFor="accountName">Account Name</label>
        <input
          type="text"
          id="accountName"
          className="accountName input"
          onChange={() => qsac(".submitBtns .SubmitBtns", "show")}
        />
      </div>
      <div className="submitBtns">
        <SubmitBtns submit={createSubAccount} cancel={"cancel"} />
      </div>
    </div>
  );
};
