import { qs, qsrc } from "../../functions/functions";
import "./SubmitBtns.css";
// import {ChangeName}
import { BsCheckLg } from "react-icons/bs";
import { ImCross } from "react-icons/im";

export const SubmitBtns = (props) => {
  return (
    <div className="SubmitBtns">
      <button className="submit" onClick={() => props.submit()}>
        <BsCheckLg />
      </button>
      <button className="cancel" onClick={() => props.cancel()}>
        <ImCross size=".8rem" />
      </button>
    </div>
  );
};
