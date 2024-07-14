import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import clientPromise from "./mongoDB";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const client = await clientPromise;
        const db = client.db("nextjs_bank");

        const userEmail = user.email;
        let dbUser = await db.collection("users").findOne({ email: userEmail });

        if (!dbUser) {
          const newUser = {
            name: user.name,
            email: user.email,
            balance: 5000,
            createdAt: new Date(),
          };
          const result = await db.collection("users").insertOne(newUser);
          dbUser = { ...newUser, _id: result.insertedId };
        }

        token.userId = dbUser._id;
      }
      return token;
    },
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
