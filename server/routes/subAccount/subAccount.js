// Libraries and Packages
import express from "express";
// import dotenv from "dotenv/config";
// import bcrypt from "bcrypt";
// import Token from "jsonwebtoken";
// import { validationResult } from "express-validator";

// Data-Base Models/Collections
import User from "../../models/userSchema.js";

//  Middleware
// import { loginValidate, signupValidate } from "../../middleware/validation.js";
// import { authenticateUser } from "../../middleware/authenticateUser.js";
// import mongoose from "mongoose";

// Functions
import { print } from "../../functions/functions.js";
import Account from "../../models/accountSchema.js";

// Express Routes
const router = express.Router();
const error = 401;
// const url = ["http://localhost:4200", ""];

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

router.post("/crypto", async (req, res) => {
  console.log("subAccount.js line 26, crypto");
  // const name = req.body.name;
  // console.log("update.js line 27, req.body.name: ", name);
  // if (!name) {
  //   print("name is:", !name);
  //   return res.status(error).send({
  //     errors: ["couldn't update the name, please try again later"],
  //   });
  // }
  const user = await User.findById(req.body.id);
  await user.accounts.push(
    new Account({
      name: "crypto1",
    })
  );
  user
    .save()
    .then(() => {
      print("new crypto wallet is created");
      res.status(200).send({
        msg: "new crypto wallet is created",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(error).send({
        errors: ["couldn't create new crypto wallet, please try again later"],
      });
    });
});

export default router;

// {
//     $push: {
//       accounts: {
//         name: "crypto",
//       },
//     },
//     $currentDate: { lastModified: true },
//   }
