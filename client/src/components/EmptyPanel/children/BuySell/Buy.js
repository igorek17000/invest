import "./BuySell.css";

import { BuySell } from "./BuySell";
import { useSelector } from "react-redux";
import { buy } from "./functions/buy";

export const Buy = () => {
  const type = useSelector((state) => state.currentInvestAccount.type);
  return <BuySell classs={type} submit={buy} />;
};
