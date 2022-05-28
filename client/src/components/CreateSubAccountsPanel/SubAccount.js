import { handleSubAccountClick } from "./functions/functions";
import { useSelector } from "react-redux";

export const SubAccount = (props) => {
  const selected = useSelector((state) => state.selectSubAccount.type);

  const selectedClass = selected === props.type ? "selected" : "";

  return (
    <div className="SubAccount" onClick={(e) => handleSubAccountClick(e)}>
      <button className={`btn ${props.type}`} id={`${selectedClass}`}>
        {props.type}
      </button>
    </div>
  );
};
