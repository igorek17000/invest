import axios from "axios";

export const getStockById = async (symbol, currency) => {
  return axios
    .get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=${currency}`
    )
    .then((res) => res.data);
  // .then((res) => console.log("buy.js line 15, axios res", res.data))
};
