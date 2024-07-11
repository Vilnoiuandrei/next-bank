"use client";

import { signOut } from "next-auth/react";
export default function SignOut() {
  return (
    <button
      className="bg-customLight text-customDark mt-3 h-10 w-24 shadow-md"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
}
