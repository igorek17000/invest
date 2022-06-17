import mongoose from "mongoose";
import { HistorySchema } from "./historySchema.js";

export const InvestAccountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Crypto", "Stocks"],
    required: true,
  },
  cash: {
    type: Number,
    required: true,
    default: 100000,
  },
  history: [HistorySchema],
});

const InvestAccount = mongoose.model("InvestAccount", InvestAccountSchema);

export default InvestAccount;
