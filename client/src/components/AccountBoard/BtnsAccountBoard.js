// Functions
import { qsac } from "../../functions/functions";
import { deleteInvestAccount } from "./functions/functions";

// CSS
import "./AccountBoard.css";

// Icons
import { FaTrashAlt, FaExchangeAlt } from "react-icons/fa";
import { AiOutlineFileAdd } from "react-icons/ai";
import { BiArrowFromBottom, BiArrowFromTop } from "react-icons/bi";
import { store } from "../../redux/store";
import { getPanel } from "../../redux/panelReducer";
import { useDispatch } from "react-redux";

export const BtnsAccountBoard = () => {
  const dispatch = useDispatch();

  return (
    <div className="BtnsAccountBoard flex row">
      <div className="btn flex" onClick={() => dispatch(getPanel("send"))}>
        <BiArrowFromBottom />
      </div>
      <div className="btn flex" onClick={() => dispatch(getPanel("receive"))}>
        <BiArrowFromTop />
      </div>
      <div
        className="btn flex"
        style={{ color: "green" }}
        onClick={() => dispatch(getPanel("sell"))}
      >
        $
      </div>
      <div
        style={{ color: "red" }}
        className="btn flex"
        onClick={() => dispatch(getPanel("buy"))}
      >
        $
      </div>
      <div className="btn flex" onClick={() => dispatch(getPanel("exchange"))}>
        <FaExchangeAlt />
      </div>
      <div
        className="delete btn flex"
        onClick={() => dispatch(getPanel("DeleteInvestAccount"))}
      >
        <FaTrashAlt color="f00" />
      </div>
      <div className="btn flex">
        <NewInvestAccountBtn />
      </div>
    </div>
  );
};

export const NewInvestAccountBtn = (props) => (
  <div
    className={`${props.classs} flex row`}
    onClick={() => store.dispatch(getPanel("NewInvestAccount"))}
  >
    {props.name}
    <AiOutlineFileAdd color="#090" size="1.15rem" />
  </div>
);
