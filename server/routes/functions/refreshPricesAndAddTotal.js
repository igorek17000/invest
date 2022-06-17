// import { getCryptoById } from "./getCryptoById.js";
// import { getStockById } from "./getStockById.js";

// export const refreshPricesAndAddTotal = async (
//   history,
//   lastBuyResult,
//   type
// ) => {
//   if (history.length === 1) {
//     return (history[0].total = history[0].amount * lastBuyResult.price);
//   }
//   const getItemPrice = (symbol, currency) =>
//     type === "Crypto"
//       ? getCryptoById(symbol, currency)
//       : type === "Stocks"
//       ? getStockById(symbol, currency)
//       : "";
//   history = await history.map(async (elem) => {
//     if (elem.symbol === lastBuyResult.symbol) {
//       elem.currentPrice = lastBuyResult.price;
//       elem.total = elem.amount * lastBuyResult.price;
//       return;
//     }
//     const buyResult = await getItemPrice(elem.symbol, "usd");
//     elem.currentPrice = buyResult.price;
//     elem.total = elem.amount * buyResult.price;
//   });
//   console.log(
//     "history from refreshPricesAndAddTotal.js, after doing that",
//     history
//   );
//   return history;
// };
