import { store } from "../../redux/store";
import { qstc } from "../../functions/functions";
import "./AccountsDropMenu.css";
import { handleSwitchAccount } from "./functions/handleSwitchAccount";

export const AccountsDropMenu = () => {
  const accounts = store.getState().user.accounts;
  const currentInvestAccountName = store.getState().currentInvestAccount.name;

  return (
    <div className="AccountsDropMenu">
      <div
        className="currentAccount"
        onClick={() => qstc(".AccountsDropMenu", "open")}
      >
        {currentInvestAccountName || "invest accounts"} \/
      </div>
      <ul className="dropMenuWrapper">
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
        {/* <li>
          <NewInvestAccountBtn name="New Invest Account" />
        </li> */}
      </ul>
    </div>
  );
};
