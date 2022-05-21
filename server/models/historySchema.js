import mongoose from "mongoose";

export const HistorySchema = new mongoose.Schema({
  status: {
    // buy or sell
    type: String,
    required: true,
    default: "string",
  },
  name: {
    type: String,
    required: true,
    default: "string",
  },
  symbol: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const History = mongoose.model("History", HistorySchema);

export default History;
