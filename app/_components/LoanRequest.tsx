"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

async function fetchLoan({ amount }: { amount: string }) {
  const res = await fetch("/api/loan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: parseFloat(amount),
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to process the loan request");
  }

  return res.json();
}

export default function Loan() {
  const [amount, setAmount] = useState("");

  const loanMutation = useMutation({
    mutationFn: fetchLoan,
    onSuccess: () => {
      setAmount("");
      alert("Loan approved and balance updated!");
    },
    onError: (error: any) => {
      alert(error.message || "An error occurred during the loan request.");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!amount) {
      alert("Please enter an amount.");
      return;
    }
    loanMutation.mutate({ amount });
  };

  return (
    <div className="md:w-52 border-4 border-customLight rounded-lg lg:w-72 w-80 h-40 mt-12">
      <h3 className="text-3xl text-center mb-1">Loan</h3>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-2 px-4 pb-2"
      >
        <input
          min="0"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded-sm"
        />
        <button type="submit" className="bg-white text-customDark2 p-2 rounded">
          Request Loan
        </button>
      </form>
    </div>
  );
}
