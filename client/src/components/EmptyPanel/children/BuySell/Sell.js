import "./BuySell.css";

import { BuySell } from "./BuySell";
import { useSelector } from "react-redux";
import { sell } from "./functions/sell";

export const Sell = () => {
  const type = useSelector((state) => state.currentInvestAccount.type);
  return <BuySell classs={type} submit={sell} />;
};
