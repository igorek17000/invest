import mongoose from "mongoose";
import { InvestAccountSchema } from "./InvestAccountSchema.js";
import InvestAccount from "./InvestAccountSchema.js";

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
  // the last account id, that user used
  currentAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InvestAccount",
    default: null,
  },

  accounts: {
    type: [InvestAccountSchema],
    default: [
      new InvestAccount({
        name: "Crypto Wallet",
        type: "Crypto",
      }),
    ],
  },
});

// await User.find().populate('currentAccount');

const User = mongoose.model("User", UserSchema);

export default User;
