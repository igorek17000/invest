// Libraries and Packages
import express from "express";

// Data-Base Models/Collections
import User from "../../Schemas/userSchema.js";
import Account from "../../Schemas/accountSchema.js";

// Functions
import { print } from "../../functions/functions.js";

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

router.post("/:type", async (req, res) => {
  const accountType = req.params.type;
  const accountName = req.body.accountName;

  console.log("subAccount.js line 26", accountType);

  const user = await User.findById(req.body.id);
  await user.accounts.push(
    new Account({
      name: accountName || "crypto1",
    })
  );

  // print("subAccount.js line 41, user accounts", user.accounts);

  user
    .save()
    .then(() => {
      // print(`subAccount.js line 46, new ${accountType} account is created`);
      res.status(200).send({
        accounts: user.accounts.map((elem) => elem.name),
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
