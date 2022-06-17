// CSS
import "./BuySell.css";

import { qsiv } from "../../../../functions/functions";

import { store } from "../../../../redux/store";
import { setSymbol, setAmount } from "../../../../redux/buySellItemReducer";
import { SubmitBtns } from "../../../SubmitBtns/SubmitBtns";
import { defualtCancelSubmitBtn } from "../functions/functions";

export const BuySell = (props) => {
  const { symbol, amount } = store.getState().buySellItem;

  return (
    <div className={`BuySellComp flex ${props.classs}`}>
      <div className="itemSymbolWrapper flex row">
        <label htmlFor="itemSymbol">Symbol</label>
        <input
          id="itemSymbol"
          className="input"
          type="text"
          defaulValue={props.classs === "crypto" ? "BitCoin" : "goog"}
          onChange={() => store.dispatch(setSymbol(qsiv("#itemSymbol")))}
        />
      </div>
      <div className="itemAmountWrapper flex row">
        <label htmlFor="itemAmount">Amount</label>
        <input
          id="itemAmount"
          type="number"
          min={props.classs === "crypto" ? "0" : "1"}
          steps="1"
          onChange={() => store.dispatch(setAmount(qsiv("#itemAmount")))}
        />
      </div>
      <SubmitBtns submit={props.submit} cancel={defualtCancelSubmitBtn} />
      {/* {symbol ? amount ? <SubmitBtns /> : "" : ""} */}
    </div>
  );
};
