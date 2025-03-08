import clientPromise from "../../_lib/mongoDB";
import { auth } from "@/app/_lib/auth";

export async function POST(req) {
  const session = await auth();

  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const { amount } = await req.json();
  if (!amount || isNaN(amount) || amount <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }
  const client = await clientPromise;
  const db = client.db("nextjs_bank");
  const user = await db
    .collection("users")
    .findOne({ email: session.user.email });

  const requiredBalance = amount * 0.3;

  if (user.balance >= requiredBalance) {
    await db
      .collection("users")
      .updateOne({ email: session.user.email }, { $inc: { balance: amount } });

    await db.collection("transactions").insertOne({
      type: "loan",
      amount,
      email: session.user.email,
      date: new Date(),
    });

    return new Response(JSON.stringify({ message: "Loan approved" }));
  } else {
    return new Response(
      JSON.stringify({ error: "Insufficient balance" }, { status: 400 })
    );
  }
}
