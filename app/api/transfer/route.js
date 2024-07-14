import connectDB from "../../_lib/mongoDB";
import User from "../../_lib/models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { senderId, recipientId, amount } = req.body;

  try {
    await connectDB();

    const sender = await User.findById(senderId);
    const recipient = await User.findById(recipientId);

    if (!sender || !recipient) {
      return res.status(404).json({ error: "User not found" });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    // Update balances
    sender.balance -= amount;
    recipient.balance += amount;

    await sender.save();
    await recipient.save();

    res.json({ message: "Transfer successful", sender, recipient });
  } catch (error) {
    console.error("Transfer error:", error);
    res.status(500).json({ error: "Server error" });
  }
}
