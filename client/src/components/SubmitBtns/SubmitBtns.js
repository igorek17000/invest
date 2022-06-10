import "./SubmitBtns.css";
// import {ChangeName}
import { BsCheckLg } from "react-icons/bs";
import { ImCross } from "react-icons/im";
// import { defualtCancelSubmitBtn } from "../EmptyPanel/children/functions/functions";

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
