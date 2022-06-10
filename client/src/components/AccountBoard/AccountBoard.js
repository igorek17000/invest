// Components
import { Table } from "../Table/Table";
import { BtnsAccountBoard, NewInvestAccountBtn } from "./BtnsAccountBoard";
import { CreateInvestAccountPanel } from "../CreateInvestAccountsPanel/CreateInvestAccountsPanel";
import { AccountsDropMenu } from "../AccountsDropMenu/AccountsDropMenu";

// CSS
import "./AccountBoard.css";
import { useSelector } from "react-redux";

// helpers functions
import { print } from "../../functions/functions";
import { NewInvestAccount } from "../EmptyPanel/children/NewInvestAccount";
import { EmptyPanel } from "../EmptyPanel/EmptyPanel";

export const AccountBoard = () => {
  const { isCurrentAccount } = useSelector(
    (state) => state.currentInvestAccount
  );

  const { currentInvestAccount } = useSelector((state) => state);

  const { panel } = useSelector((state) => state);
  const isPanel = panel.isPanel ? <EmptyPanel /> : "";

  print("AccountBoard.js line 21, cash", currentInvestAccount.cash);

  return (
    <div className="AccountBoard flex">
      <BtnsAccountBoard />
      <AccountsDropMenu />

      {isPanel}
      {/* <CreateInvestAccountPanel /> */}
      {isCurrentAccount ? (
        <Table
          rows={[
            ["FB", "Meta Platforms Inc - Class A", "10", "195.13", "19513"],
            ["q", "w", "e", "r", "t"],
            ["q", "w", "e", "r", "t"],
          ]}
          footer={["TOTAL", "", "", "", currentInvestAccount.cash]}
        />
      ) : (
        <NewInvestAccountBtn classs="button" name="New Invest Account" />
      )}
    </div>
  );
};
