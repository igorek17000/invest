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

router.get("/", (req, res) => res.send("hello from sell"));

router.post("/", async (req, res) => {
  // console.log("sell.js lne 9, req.body", req.body);
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

  const sellResult =
    currentAccount.type === "Crypto"
      ? await getCryptoById(symbol, currency)
      : currentAccount.type === "Stock"
      ? await getStockById(symbol, currency)
      : "";
  // console.log("sell.js line 31, sell result", sellResult);
  if (sellResult === "error") {
    return res.status(400).send("error please try again later");
  }

  // the app need to check the total amount of a single item
  // to make sure have enough items to sell, and becuase mongdb
  // is shit, I have to make a new user find request to avoid changing
  // the main document when the app is reducing the history for the
  // home page fuck mongo db

  // const history = currentAccount.history;

  const theSameUser = await User.findOne({
    _id: req.body.id,
  });

  const theSameUserHistory = theSameUser.accounts.filter(
    (elem) => user.currentAccount && elem._id.toString() === user.currentAccount
  )[0].history;

  if (theSameUserHistory.length === 0) {
    return res
      .status(400)
      .send({ errors: [`you don't have enough ${symbol} to sell`] });
  }

  const historyReducer = reduceHistory(theSameUserHistory);
  const totalOfOneItem = historyReducer.filter(
    (elem) => elem.symbol === symbol
  )[0];

  console.log("sell.js line 66, totalOfOneItem", totalOfOneItem);
  if (!totalOfOneItem) {
    return res
      .status(400)
      .send({ errors: [`you don't have enough ${symbol} to sell`] });
  }
  if (totalOfOneItem.amount < amount) {
    return res
      .status(400)
      .send({ errors: [`you don't have enough ${symbol} to sell`] });
  }

  // mongo db is shit and their documentation is bullshit
  // a normal fucking map function mutate the original fucking mongo
  // array

  // currentAccount.history = user.accounts.filter(
  //   (elem) => elem._id.toString() === user.currentAccount
  // )[0].history;
  const total = amount * sellResult.price;

  currentAccount.history.push(
    new History({
      status: "sell",
      name: sellResult.symbol,
      symbol: sellResult.symbol,
      amount: -amount,
      total: total,
      price: sellResult.price,
      currentPrice: sellResult.price,
    })
  );

  currentAccount.cash += total;

  // console.log("sell.js line 94, cash", currentAccount.cash);

  await user
    .save()
    .then(() => {
      // console.log(
      //   "sell.js line 74, user current account after saving it in the databse",
      //   currentAccount
      // );
    })
    .catch((err) => {
      console.log(err);
      return res.send({ errors: ["error, please try again later"] });
    });

  //  history GroupBy function
  // const historyWithTotal = refreshPricesAndAddTotal(
  //   historyReducer,
  //   sellResult
  // );
  currentAccount.history = reduceHistory(currentAccount.history, sellResult);

  return res.send({
    currentAccount: currentAccount,
  });
});

export default router;
