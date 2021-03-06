// Libraries and Packages
import express from "express";
import dotenv from "dotenv/config";
import bcrypt from "bcrypt";
import Token from "jsonwebtoken";
import { validationResult } from "express-validator";

// Data-Base Models/Collections
import User from "../../Schemas/userSchema.js";

//  Middleware
import { loginValidate, signupValidate } from "../../middleware/validation.js";
import { authenticateUser } from "../../middleware/authenticateUser.js";

// Functions
import { print } from "../../functions/functions.js";
import { reduceHistory } from "../functions/reduceHistory.js";

// sub routes
import UserUpdateRouter from "../update/update.js";
import UserInvestAccountRouter from "../investAccount/investAccount.js";
import SellRouter from "../sell/sell.js";
import BuyRouter from "../buy/buy.js";

// Express Routes
const router = express.Router();
const error = 401;

// router middleware
router.use("/investAccount", authenticateUser, UserInvestAccountRouter);
router.use("/update", authenticateUser, UserUpdateRouter);
router.use("/sell", authenticateUser, SellRouter);
router.use("/buy", authenticateUser, BuyRouter);
// router.use("/send", authenticateUser, SendRouter);
// router.use("/recieve", authenticateUser, RecieveRouter);
// router.use("/exchange", authenticateUser, ExchangeRouter);

//Routes
router.get("/", authenticateUser, async (req, res) => {
  const user = await User.findOne({ _id: req.body.id });

  if (user) {
    print("user.js line 37", user);

    const currentAccount = user.accounts.filter(
      (elem) => elem._id.toString() === user.currentAccount
    )[0];

    currentAccount
      ? currentAccount.history
        ? (currentAccount.history = reduceHistory(currentAccount.history))
        : ""
      : "";
    console.log("user.js line 171, currentAccount", currentAccount);

    // print([
    //   "user.js  line 46, user current account type",
    //   typeof user.currentAccount.toString(),
    //   typeof user.accounts[0]._id.toString(),
    // ]);

    return setTimeout(() => {
      res.status(200).send({
        verified: true,
        username: user.username,
        name: user.name,
        mode: user.mode,
        accounts: user.accounts.map((elem) => ({
          id: elem._id,
          name: elem.name,
        })),
        currentAccount: currentAccount,
      });
    }, 1000 * 0);
  }
  return res.status(error).send({ errors: ["error, no uesr is found"] });
});

router.post("/login", loginValidate, async (req, res) => {
  // check request header if it has a token
  // console.log("login token", req.headers.authorization);
  console.log("logging in");
  // const token = req.headers.authorization.split(" ")[1];
  // if (token) {
  //   console.log("user.js line 33: ", token);
  //   return (
  //     console.log("user.js line 25: redirected"),
  //     res.redirect(url[0] + "/api/user")
  //   );
  // }

  // console.log("no auth token");

  // validate the user input and send array of errors msg
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("express validation error", errors);
    return res
      .status(error)
      .json({ errors: errors.array().map((elem) => elem.msg) });
  }

  console.log("express validation is passed");
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, "looking for user");

  const user = await User.findOne({ username: username });

  print("user line 84, user: ", user);

  // check if the username does exist in the database
  if (!user) {
    return res.status(error).send({
      errors: [`no user is found with this username ${username}`],
    });
  }

  console.log("user is found");

  bcrypt.compare(password, user.password, function (err, result) {
    console.log(
      "result for verifying the user's password when logging in",
      result
    );
    if (err) {
      console.log("error", err);
      return res
        .status(error)
        .send({ errors: ["error, please try again later"] });
    }
    if (result !== true) {
      return res.status(error).send({
        errors: [`password is wrong, please try again`],
      });
    }
    // generate token and add it to headers response
    try {
      const token = getToken(user._id);

      const currentAccount = user.accounts.filter(
        (elem) => elem._id.toString() === user.currentAccount.toString()
      )[0];
      currentAccount
        ? currentAccount.history
          ? (currentAccount.history = [
              ...reduceHistory(currentAccount.history),
            ])
          : ""
        : "";
      console.log("user.js line 112: generated token after signing in", token);

      console.log("user.js line 152, currentAccount", currentAccount);
      return setTimeout(
        () =>
          res
            // .cookie("token", token, {
            //   httpOnly: false,
            //   secure: true,
            //   // sameSite: none,
            //   maxAge: 900000,
            // })
            .status(200)
            .set({
              "Access-Control-Expose-Headers": "Authorization",
              Authorization: "Bearer " + token,
            }) // .cookie("token", token, {
            //   httpOnly: false,
            //   secure: true,
            //   // sameSite: none,
            //   maxAge: 900000,
            // })
            .send({
              username: user.username,
              name: user.name,
              mode: user.mode,
              currentAccount: currentAccount,
              accounts: user.accounts.map((elem) => {
                return { id: elem._id, name: elem.name };
              }),
            }),
        2000 * 0
      );
      // return (

      // );
    } catch (err) {
      console.error(err);
      res.status(error).send({ errors: ["error, please try again later"] });
    }
  });
});

router.get("/logout", (req, res) => {
  try {
    req.cookies.token;
  } catch {}
  return res.send("logged out");
});

router.post("/signup", loginValidate, signupValidate, async (req, res) => {
  // check request header if it has a token
  // if (req.headers.authorization)
  //   return (
  //     console.log("user.js line 95: redirected"),
  //     res.redirect(url[0] + "/api/user")
  //   );

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return (
      res
        .status(error)
        //return only the first error
        .json({ errors: errors.array().map((elem) => elem.msg) })
    );
  }

  const username = req.body.username;
  const password = req.body.password;
  const repeat_password = req.body.repeat_password;
  const checkUsername = await User.findOne({ username: username });

  if (checkUsername) {
    return res.status(403).send({ errors: ["username not available"] });
  }

  if (repeat_password !== password) {
    return res.status(error).send({ errors: ["passwords doesn't match"] });
  }

  // hash the password
  const hashedPassword = hashPassword(password);
  // console.log("user.js line 122", hashedPassword);
  if (!hashedPassword) {
    // console.log("user.js line 124", hashedPassword);
    return res
      .status(error)
      .send({ errors: ["Error, please try again later"] });
  }

  console.log("user.js line 157", hashedPassword);

  // store the user with the hashed password in the database
  const newUser = await new User({
    username: username,
    password: hashedPassword,
  });

  newUser.save((err) => {
    if (err) {
      return res.status(error).send({ errors: [err.message] });
    }
    // generate token and add it to headers response
    try {
      const token = getToken(newUser._id, username);
      // console.log(token);
      return (
        res
          // .cookie("token", token, {
          //   httpOnly: false,
          //   // secure: loading.env.NODE_ENV === "production" ? true : false,
          //   maxAge: 900000,
          // })
          .set({
            "Access-Control-Expose-Headers": "Authorization",
            Authorization: "Bearer " + token,
          })
          .send({
            username: newUser.username,
            accounts: newUser.accounts.map((elem) => {
              return { id: elem._id, name: elem.name };
            }),
          })
      );
    } catch (err) {
      console.error(err);
      return res
        .status(error)
        .send({ errors: ["error, please try again later"] });
    }
  });
});

// router.get("/", (req, res) => {
//   return res.send("");
// });

export default router;

// create token for the user
function getToken(id) {
  return Token.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: "7d",
  });
}

function hashPassword(password) {
  const hash = bcrypt.hashSync(password, 10);
  console.log("user.js line 156", hash);
  return hash;
}
