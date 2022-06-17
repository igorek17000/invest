import mongoose from "mongoose";

export const HistorySchema = new mongoose.Schema({
  status: {
    // buy or sell, (exchange, send, receive)
    type: String,
    enum: ["buy", "sell"],
    required: true,
  },
  name: {
    type: String,
    required: true,
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
  total: {
    type: Number,
    required: true,
  },
  currentPrice: {
    type: Number,
    required: true,
  },
});

const History = mongoose.model("History", HistorySchema);

export default History;
