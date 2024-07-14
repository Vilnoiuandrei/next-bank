import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true, enum: ["credit", "debit", "transfer"] },
  date: { type: Date, default: Date.now },
  description: { type: String },
});

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);
