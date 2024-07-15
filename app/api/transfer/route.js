import clientPromise from "@/app/_lib/mongoDB";
import { auth } from "@/app/_lib/auth";

export async function POST(req) {
  const { amount, recipient } = await req.json();

  if (!amount || !recipient) {
    return new Response(
      JSON.stringify({ message: "Missing required fields" }),
      { status: 400 }
    );
  }

  const session = await auth();

  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const email = session.user.email;

  try {
    const client = await clientPromise;
    const db = client.db("nextjs_bank");

    // Deduct the amount from the current user's balance
    await db
      .collection("users")
      .updateOne({ email }, { $inc: { balance: -amount } });

    //Crate transaction for the current user
    await db.collection("transactions").insertOne({
      type: "transfer",
      amount,
      email,
      date: new Date(),
    });
    // Add the amount to the recipient's balance
    await db
      .collection("users")
      .updateOne({ email: recipient }, { $inc: { balance: amount } });
    //Crate transaction for the current user
    await db.collection("transactions").insertOne({
      type: "transfer",
      amount,
      email: recipient,
      date: new Date(),
    });

    return new Response(JSON.stringify({ message: "Transfer successful" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Transfer error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
