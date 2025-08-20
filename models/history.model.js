import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // who claimed
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },   // from whom
  points: { type: Number, required: true, min: 1, max: 10 },
  createdAt: { type: Date, default: Date.now }
}, {timestamps: true});

const History = mongoose.model("History", historySchema);
export default History;
