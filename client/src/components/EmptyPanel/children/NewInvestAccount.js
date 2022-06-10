// CSS
import "./children.css";

// Functions
import { qsac } from "../../../functions/functions";
import { createInvestAccount } from "../../CreateInvestAccountsPanel/functions/createInvestAccount";

// Components
import { InvestAccount } from "../../CreateInvestAccountsPanel/InvestAccount";
import { SubmitBtns } from "../../SubmitBtns/SubmitBtns";
import { defualtCancelSubmitBtn } from "./functions/functions";

export const NewInvestAccount = () => {
  return (
    <>
      <div className="accounts flex row ">
        <InvestAccount type={"Crypto"} />
        <InvestAccount type={"Stocks"} />
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
        <SubmitBtns
          submit={createInvestAccount}
          cancel={defualtCancelSubmitBtn}
        />
      </div>
    </>
  );
};
