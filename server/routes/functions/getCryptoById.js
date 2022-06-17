import axios from "axios";

export const getCryptoById = async (symbol, currency) => {
  return axios
    .get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=${currency}`
    )
    .then((res) => {
      //   console.log(res.data[symbol]);
      return {
        symbol: symbol,
        price: res.data[symbol][currency],
      };
    })
    .catch((err) => {
      console.log(err);
      return "error";
    });
  // .then((res) => console.log("getCryptoById.js line 15, axios res"));
};
