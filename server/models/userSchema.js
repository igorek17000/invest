import mongoose from "mongoose";
import { accountSchema } from "./accountSchema.js";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    default: "light",
  },
  name: {
    type: String,
    default: "",
  },
  accounts: [accountSchema],
});

const User = mongoose.model("User", UserSchema);

export default User;
