import { store } from "../../redux/store";
import { qsac, qstc } from "../../functions/functions";
import "./AccountsDropMenu.css";

export const AccountsDropMenu = () => {
  const accounts = store.getState().user.accounts;
  return (
    <div className="AccountsDropMenu">
      <div
        className="currentAccount"
        onClick={() => qstc(".AccountsDropMenu", "open")}
      >
        current account \/
      </div>
      <ul className="dropMenuWrapper">
        {accounts.map((account) => (
          <li>{account}</li>
        ))}
        <li>
          <button onClick={() => qsac(".CreateSubAccountPanel", "show")}>
            New Sub Account +
          </button>
        </li>
      </ul>
    </div>
  );
};
