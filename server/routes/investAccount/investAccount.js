// Libraries and Packages
import express from "express";

// Data-Base Models/Collections
import User from "../../Schemas/userSchema.js";
import InvestAccount from "../../Schemas/InvestAccountSchema.js";

// Functions
import { print } from "../../functions/functions.js";

import { mongoose } from "mongoose";

// Express Routes
const router = express.Router();
const error = 401;

//Routes
router.get("/", async (req, res) => {
  const user = await User.findById(req.body.id);
  print("sub account", user, user.accounts);
  return res.send("sub account");
});

// router.get("/", (req, res) => {
//   print("sub account");
//   return res.send("sub account");
// });

// get invest account object by its id
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.body.id);

  if (user) {
    print(
      "user from invest account line 32, get invest account by id from params",
      user
    );

    // print(
    //   "user from invest account line 32, get invest account by id from params",
    //   user
    // );

    const investAccount = user.accounts.filter(
      (elem) => elem._id == req.params.id
    )[0];

    await user.updateOne({
      $set: { currentAccount: investAccount._id },
    });

    print("user after update the current account", user);

    user
      .save()
      .then(() => {
        return res.send(investAccount);
      })
      .catch((err) => {
        console.log(err);
        return res.status(error).send({
          errors: ["error,  please try again later"],
        });
      });
  }
  // return res.status(error).send("error");
});

// delete invest account object by its id
router.delete("/:id", async (req, res) => {
  // {
  //   $pull: {
  //     accounts: {
  //       _id: req.params.id,
  //     },
  //   },
  // }
  await User.findOne({
    _id: req.body.id,
  })
    .then((user) => {
      user.accounts.pull({ _id: req.params.id });
      return user;
    })
    .then((user) => {
      user.updateOne({
        $set: { currentAccount: null },
      });

      return user;
    })
    .then((user) => {
      user
        .save()
        .then(() => res.status(200).send({ accounts: user.accounts }))
        .catch(() => res.status(200).send("error"));
    })
    .catch((err) => {
      print(err);
      res.status(error).send("error");
    });
});

// create new invest account
router.post("/:type", async (req, res) => {
  const accountType = req.params.type;
  const accountName = req.body.accountName;

  console.log("investAccount.js line 70", accountType);

  const user = await User.findById(req.body.id);

  const newInvestAccount = new InvestAccount({
    name: accountName || accountType,
    type: accountType,
  });

  await user.accounts.push(newInvestAccount);

  await user.update({
    $set: { currentAccount: mongoose.Types.ObjectId(newInvestAccount._id) },
  });

  print("investAccount.js line 92, user accounts", user);

  user
    .save()
    .then(() => {
      // print(`subAccount.js line 46, new ${accountType} account is created`);
      res.status(200).send({
        accounts: user.accounts.map((elem) => {
          return {
            id: elem._id,
            name: elem.name,
          };
        }),
        currentAccount: newInvestAccount,
        msg: `new ${accountType} account is created`,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(error).send({
        errors: [
          `couldn't create new ${accountType} account, please try again later`,
        ],
      });
    });
});

export default router;
