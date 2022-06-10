// CSS
import "../children.css";

// Components
import { SubmitBtns } from "../../../SubmitBtns/SubmitBtns";
import { confirmDeleteInvestAccount } from "./functions/confirmDeleteInvestAccount";
import { defualtCancelSubmitBtn } from "../functions/functions";

export const DeleteInvestAccount = () => {
  return (
    <div className="DeleteInvestAccount flex">
      are you sure, you want to delete this account?
      <SubmitBtns
        submit={confirmDeleteInvestAccount}
        cancel={defualtCancelSubmitBtn}
      />
    </div>
  );
};
