// CSS
import "../../GlobalVars.css";
import "./EmptyPanel.css";

// Functions
import { qsrc } from "../../functions/functions";
import { store } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { closePanel } from "../../redux/panelReducer";
import { NewInvestAccount } from "./children/NewInvestAccount";
import { DeleteInvestAccount } from "./children/DeleteInvestAccount/DeleteInvestAccount";

export const EmptyPanel = () => {
  const dispatch = useDispatch();
  const panelType = useSelector((state) => state.panel.type);

  const Children = useSelector((state) => state.panel.children);

  let children;

  switch (panelType) {
    case "NewInvestAccount":
      children = <NewInvestAccount />;
      break;
    case "DeleteInvestAccount":
      children = <DeleteInvestAccount />;
      break;
    case "exchange":
      children = "coming soon";
      break;
    case "buy":
      children = "coming soon";
      break;
    case "sell":
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
      {/* <Children /> */}
    </div>
  );
};
