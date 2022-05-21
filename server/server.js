// Libraries and Packages
import express, { application } from "express";
import dotev from "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

// Routes
import UserRoute from "./routes/user/user.js";
import UserUpdateRoute from "./routes/update/update.js";

// middleware
import { authenticateUser } from "./middleware/authenticateUser.js";
import { test } from "./middleware/test.js";

// Functions
import { print } from "./functions/functions.js";

// const variable
const local = "http://localhost:3000";
const production = "https://mern-template-00.lm.r.appspot.com";
const app = express();
const port = process.env.PORT || 3000;
const origin = process.env.NODE_ENV === "production" ? production : local;

const corsConfig = {
  origin: local,
  credentials: true,
  "Access-Control-Request-Method": ["get", "post", "put", "delete"],
};

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// connect to mongodb
// 0: disconnected
// 1: connected
// 2: connecting
// 3: disconnecting
const mongoStatus = {
  0: "disconnected",
  1: "connected",
  2: "connecting",
  3: "disconnecting",
};

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() =>
    print(
      "MongoDB is",
      mongoStatus[mongoose.connection.readyState],
      mongoose.connection.readyState
    )
  )
  .catch((err) => console.error(err));
// end connect to mongodb

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", cors(corsConfig));
app.use(cookieParser());
// middleware to check the req data
app.use("/", test);
// app.use(express.static(__dirname + "/client/build"));
app.use("/api/user", UserRoute);
// app.get("*", (req, res) => {
// res.sendFile(path.join(__dirname + "/client/build/index.html"));
// });
app.use("/", authenticateUser);

// end express middleware

// if (process.env.NODE_ENV === "production") {
// }

// www.adsfa.com
// api.asdf.com

//
//
//
//
//
//
//
//

app.get("/", (req, res) => {
  return res.send(`Hello, world`); //${req.body.name}
});

app.listen(port, () => print(`app is running on port ${port}`));
