// Functions
import { CreateSubAccountPanel } from "../../components/CreateSubAccountsPanel/CreateSubAccountsPanel";
import { AccountsDropMenu } from "../../components/AccountsDropMenu/AccountsDropMenu";
import { Table } from "../Table/Table";

// CSS
import "./AccountBoard.css";

export const AccountBoard = () => {
  return (
    <div className="AccountBoard flex">
      <AccountsDropMenu />
      <CreateSubAccountPanel />
      <Table
        headers={["1", "2", "3"]}
        rows={[
          ["q", "w", "e"],
          ["q", "w", "e"],
          ["q", "w", "e"],
        ]}
        //   footer={["", "", "100,000"]}
      />
    </div>
  );
};
