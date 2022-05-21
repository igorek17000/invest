// Libraries and Packages
import Token from "jsonwebtoken";
import dotenv from "dotenv/config";
import mongoose from "mongoose";

// Models
// import User from "../models/userSchema.js";

// Functions

export async function authenticateUser(req, res, next) {
  // console.log(req.headers.cookies);
  const token = req.headers.authorization;
  console.log("authenticateUser.js line 14: ", req.headers.authorization);
  // console.log("authenticateUser.js line 13", token);
  if (token) {
    try {
      const decode = Token.verify(token.split(" ")[1], process.env.TOKEN_KEY);
      console.log(decode.username);
      req.body.id = decode.id;
      return next();
    } catch (err) {
      console.log(err);
      return res
        .status(401)
        .send({ errors: ["access denied, please login first"] });
    }
  }
  return res
    .status(401)
    .send({ errors: ["access denied, please login first"] });
}
