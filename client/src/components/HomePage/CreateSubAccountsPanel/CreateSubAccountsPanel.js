import "../../../GlobalVars.css";
import "./CreateSubAccountPanel.css";
import { SubAccount } from "./SubAccount";
import { qsrc, print, qsac } from "../../../functions/functions";
import { SubmitBtns } from "../../SubmitBtns/SubmitBtns";
import { store } from "../../../redux/store";
import { createSubAccount } from "./functions/createSubAccount";

export const CreateSubAccountPanel = () => {
  const isSelected = store.getState().selectSubAccount.isSelected;
  // eslint-disable-next-line no-unused-expressions
  isSelected ? qsac(".submitBtns .SubmitBtns", "show") : "";
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
      <div className="submitBtns">
        <SubmitBtns submit={createSubAccount} cancel={"cancel"} />
      </div>
    </div>
  );
};
