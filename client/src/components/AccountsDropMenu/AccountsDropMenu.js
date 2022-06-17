import { useSelector } from "react-redux";
import { qstc } from "../../functions/functions";
import "./AccountsDropMenu.css";
import { handleSwitchAccount } from "./functions/handleSwitchAccount";

export const AccountsDropMenu = () => {
  const accounts = useSelector((state) => state.user.accounts);
  const currentInvestAccountName = useSelector(
    (state) => state.currentInvestAccount.name
  );

  return (
    <div
      className="AccountsDropMenu"
      onClick={() => qstc(".AccountsDropMenu", "open")}
    >
      <div className="currentAccount">
        {currentInvestAccountName || "invest accounts"}
      </div>
      <ul className="dropMenu">
        {accounts.map((account) => (
          <li>
            <button
              onClick={() => handleSwitchAccount(account.id)}
              id={account.id}
            >
              {account.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
