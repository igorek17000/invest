import mongoose from "mongoose";
import { HistorySchema } from "./historySchema.js";

export const accountSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  history: [HistorySchema],
  cash: {
    type: Number,
    required: true,
    default: 100000,
  },
});

const Account = mongoose.model("Account", accountSchema);

export default Account;
