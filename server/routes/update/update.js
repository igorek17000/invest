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
import mongoose from "mongoose";

// Functions
import { print } from "../../functions/functions.js";

// Express Routes
const router = express.Router();
const error = 401;
const url = ["http://localhost:4200", ""];

//Routes
router.put("/name", async (req, res) => {
  // console.log(req.body.id, Object.keys());
  const name = req.body.name;
  console.log("update.js line 27, req.body.name: ", name);
  if (!name) {
    print("name is:", !name);
    return res.status(error).send({
      errors: ["couldn't update the name, please try again later"],
    });
  }
  await User.updateOne(
    { _id: req.body.id },
    {
      $set: { name: name },
      $currentDate: { lastModified: true },
    }
  )
    .then(() => {
      print("name is changed");
      res.status(200).send({
        name: name,
        msg: "name has been changed successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(error).send({
        errors: ["couldn't update the name, please try again later"],
      });
    });
});

router.put("/mode", async (req, res) => {
  // console.log(req.body.id);
  const mode = req.body.mode;
  console.log("update.js line 52, req.body.mode: ", `${mode}`);
  if (mode !== "light" && mode !== "dark") {
    console.log("update mode error");
    return res.status(error).send({
      errors: ["couldn't update the mode, please try again later"],
    });
  }
  await User.updateOne(
    { _id: req.body.id },
    {
      $set: { mode: mode },
      $currentDate: { lastModified: true },
    }
  )
    .then(() => {
      console.log("");
      res.status(200).send("mode changed");
    })
    .catch((err) => {
      console.log(err);
      return res.status(error).send({
        errors: ["couldn't update the mode, please try again later"],
      });
    });
});

export default router;
