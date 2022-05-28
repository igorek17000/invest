// Libraries and Packages
import Token from "jsonwebtoken";
import dotenv from "dotenv/config";
import mongoose from "mongoose";

export async function authenticateUser(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decode = Token.verify(token.split(" ")[1], process.env.TOKEN_KEY);
      req.body.id = decode.id;
      return next();
    } catch (err) {
      console.log(err);
      return res
        .status(401)
        .send({ errors: "access denied, please login first" });
    }
  }
  return res.status(401).send({ errors: "access denied, please login first" });
}
