"use client";

import { signOut } from "next-auth/react";
export default function SignOut() {
  return (
    <button
      className="bg-customLight text-customDark  h-10 w-52 shadow-md rounded-md mr-4"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
}
