import { handleInvestAccountClick } from "./functions/functions";
import { useSelector } from "react-redux";

export const InvestAccount = (props) => {
  const selected = useSelector((state) => state.selectInvestAccount.type);

  const selectedClass = selected === props.type ? "selected" : "";

  return (
    <div className="InvestAccount" onClick={(e) => handleInvestAccountClick(e)}>
      <button className={`btn ${props.type}`} id={`${selectedClass}`}>
        {props.type}
      </button>
    </div>
  );
};
