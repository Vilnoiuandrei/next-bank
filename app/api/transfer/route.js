import clientPromise from "@/app/_lib/mongoDB";
import { auth } from "@/app/_lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { amount, recipient } = await req.json();
  const session = await auth();

  if (!amount || !recipient) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const email = session.user.email;

  try {
    const client = await clientPromise;
    const db = client.db("nextjs_bank");

    // Deduct the amount from the current user's balance
    const debitResult = await db
      .collection("users")
      .updateOne({ email }, { $inc: { balance: -amount } });

    if (debitResult.modifiedCount === 0) {
      return NextResponse.json(
        { message: "Failed to debit user's account" },
        { status: 500 }
      );
    }

    // Create transaction for the current user
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

    // How to make it work only for exsitnet recipent
    //
    //
    // if (creditResult.modifiedCount === 0) {
    //   // Rollback debit if credit fails
    //   await db
    //     .collection("users")
    //     .updateOne({ email }, { $inc: { balance: amount } });
    //
    //   return NextResponse.json(
    //     { message: "Failed to credit recipient's account" },
    //     { status: 500 }
    //   );
    // }

    // Create transaction for the recipient
    await db.collection("transactions").insertOne({
      type: "transfer",
      amount,
      email: recipient,
      date: new Date(),
    });

    return NextResponse.json(
      { message: "Transfer successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Transfer error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const email = session.user.email;

  try {
    const client = await clientPromise;
    const db = client.db("nextjs_bank");

    const transactions = await db
      .collection("transactions")
      .find({ email })
      .toArray();
    console.log(transactions);

    return NextResponse.json({ transactions }, { status: 200 });
  } catch (error) {
    console.error("Fetch transactions error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
