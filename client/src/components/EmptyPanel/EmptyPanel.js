// CSS
import "../../GlobalVars.css";
import "./EmptyPanel.css";

// Functions
import { useSelector, useDispatch } from "react-redux";
import { closePanel } from "../../redux/panelReducer";

// Children
import { NewInvestAccount } from "./children/NewInvestAccount";
import { DeleteInvestAccount } from "./children/DeleteInvestAccount/DeleteInvestAccount";
import { Buy } from "./children/BuySell/Buy";
import { Sell } from "./children/BuySell/Sell";

export const EmptyPanel = () => {
  const dispatch = useDispatch();
  const panelType = useSelector((state) => state.panel.type);

  let children;

  switch (panelType) {
    case "NewInvestAccount":
      children = <NewInvestAccount />;
      break;
    case "DeleteInvestAccount":
      children = <DeleteInvestAccount />;
      break;
    case "buy":
      children = <Buy />;
      break;
    case "sell":
      children = <Sell />;
      break;
    case "exchange":
      children = "coming soon";
      break;
    case "send":
      children = "coming soon";
      break;
    case "receive":
      children = "coming soon";
      break;
    default:
      children = "Nothing to show";
  }

  return (
    <div className="EmptyPanel flex">
      <button
        className="emptyPanelCloseBtn closeBtn btn"
        onClick={() => dispatch(closePanel())}
      ></button>
      {children}
    </div>
  );
};
