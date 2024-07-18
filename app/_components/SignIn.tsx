"use client";
import { signIn } from "next-auth/react";
export default function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <p>Please log in to view your account.</p>
      <button
        className="bg-customLight text-customDark mt-3 h-10 w-24 shadow-md rounded-sm"
        onClick={() => signIn("google", { redirectTo: "/account" })}
      >
        Sign In
      </button>
    </div>
  );
}
