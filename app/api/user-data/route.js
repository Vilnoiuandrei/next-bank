import { NextResponse } from "next/server";
import { auth, authOptions } from "../../_lib/auth";
import clientPromise from "../../_lib/mongoDB";

export async function GET() {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const client = await clientPromise;
    const db = client.db("nextjs_bank");

    const userEmail = session.user.email;
    const user = await db.collection("users").findOne({ email: userEmail });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const transfers = await db
      .collection("transfers")
      .find({ userId: user._id })
      .toArray();
    return NextResponse.json({ user, transfers });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
