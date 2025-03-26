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
  const [message, setMessage] = useState("");

  const loanMutation = useMutation({
    mutationFn: fetchLoan,
    onSuccess: () => {
      setAmount("");
      setMessage("Loan approved and balance updated!");
    },
    onError: (error: any) => {
      setMessage(error.message || "An error occurred during the loan request.");
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

  function closePopup(): void {
    setMessage("");
  }
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
      <div
        className={`absolute left-0 top-0 z-10 w-screen h-screen bg-customDark2 text-customDark2 flex items-center justify-center transition-opacity duration-300 ${
          message ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white p-6 rounded shadow-lg relative">
          <p>{message}</p>
          <button
            onClick={closePopup}
            className="absolute top-0 right-1 text-xl font-bold"
          >
            ✖
          </button>
        </div>
      </div>
    </div>
  );
}
