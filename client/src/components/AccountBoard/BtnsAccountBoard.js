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
      <div
        data-hover="Send"
        className="btn flex"
        onClick={() => dispatch(getPanel("send"))}
      >
        <BiArrowFromBottom />
      </div>
      <div
        data-hover="Receive"
        className="btn flex"
        onClick={() => dispatch(getPanel("receive"))}
      >
        <BiArrowFromTop />
      </div>
      <div
        data-hover="Exchange"
        className="btn flex"
        onClick={() => dispatch(getPanel("exchange"))}
      >
        <FaExchangeAlt />
      </div>
      <div
        data-hover="Sell"
        style={{ color: "red" }}
        className="btn flex"
        onClick={() => dispatch(getPanel("sell"))}
      >
        $
      </div>
      <div
        data-hover="Buy"
        className="btn flex"
        style={{ color: "green" }}
        onClick={() => dispatch(getPanel("buy"))}
      >
        $
      </div>
      <div
        data-hover="Delete"
        className="delete btn flex"
        onClick={() => dispatch(getPanel("DeleteInvestAccount"))}
      >
        <FaTrashAlt color="f00" />
      </div>
      <div data-hover="New_Invest_Account" className="btn flex">
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
