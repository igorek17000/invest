import express from "express";
import axios from "axios";
import User from "../../Schemas/userSchema.js";
import { getCryptoById } from "../functions/getCryptoById.js";
import { getStockById } from "../functions/getStockById.js";
// import { print } from "../../functions/functions";
import History from "../../Schemas/historySchema.js";
import { reduceHistory } from "../functions/reduceHistory.js";
// import { refreshPricesAndAddTotal } from "../functions/refreshPricesAndAddTotal.js";

const router = express.Router();

router.get("/", (req, res) => res.send("hello from buy"));

router.post("/", async (req, res) => {
  // console.log("buy.js lne 9, req.body", req.body);
  const currency = "usd";
  // const id = req.params.id;
  const user = await User.findOne({ _id: req.body.id });
  const currentAccount = user.accounts.filter(
    (elem) => elem._id.toString() === user.currentAccount
  )[0];
  if (!currentAccount) {
    return res
      .status(400)
      .send({ errors: ["please select an invest account first"] });
  }
  const symbol = req.body.item.symbol;
  const amount = req.body.item.amount;

  // console.log(currentAccount);

  const buyResult =
    currentAccount.type === "Crypto"
      ? await getCryptoById(symbol, currency)
      : currentAccount.type === "Stock"
      ? await getStockById(symbol, currency)
      : "";

  // console.log("buy.js line 31, buy result", buyResult);
  if (buyResult === "error") {
    return res.status(400).send("error please try again later");
  }

  if (currentAccount.cash < buyResult.price * amount) {
    return res
      .status(400)
      .send({ errors: [`you don't have cash to buy ${amount} of ${symbol}`] });
  }

  currentAccount.history.push(
    new History({
      status: "buy",
      name: buyResult.symbol,
      symbol: buyResult.symbol,
      amount: amount,
      total: amount * buyResult.price,
      price: buyResult.price,
      currentPrice: buyResult.price,
    })
  );

  await user
    .save()
    .then(() => {
      // console.log(
      //   "buy.js line 74, user current account after saving it in the databse",
      //   currentAccount
      // );
    })
    .catch((err) => {
      console.log(err);
      return res.send({ errors: ["error, please try again later"] });
    });

  //  history GroupBy function
  const history = user.accounts.filter(
    (account) => account._id.toString() === user.currentAccount
  )[0].history;

  const historyReducer = reduceHistory(history, buyResult);

  // const historyWithTotal = refreshPricesAndAddTotal(
  //   historyReducer,
  //   buyResult,
  //   currentAccount.type
  // );

  currentAccount.history = historyReducer;

  return res.send({
    currentAccount: currentAccount,
  });
});

export default router;
