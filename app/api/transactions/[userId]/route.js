import { NextResponse } from "next/server";
import dbConnect from "../../../../_lib/mongodb";
import Transaction from "../../../../_lib/models/Transaction";

export async function GET(req, { params }) {
  const { userId } = params;

  await dbConnect();

  try {
    const transactions = await Transaction.find({ userId });
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
