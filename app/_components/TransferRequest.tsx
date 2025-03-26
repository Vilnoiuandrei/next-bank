"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

async function fetchTransfer({
  amount,
  recipient,
}: {
  amount: string;
  recipient: string;
}) {
  const res = await fetch("/api/transfer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: parseFloat(amount),
      recipient,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to process the transfer");
  }

  return res.json();
}

export default function Transfer() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const transfer = useMutation({
    mutationFn: fetchTransfer,
    onSuccess: () => {
      setAmount("");
      setRecipient("");
      setMessage("Transfer successful!");
    },
    onError: (error: any) => {
      setMessage(error.message || "An error occurred during the transfer.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !recipient) {
      setMessage("Please fill in all fields.");
      return;
    }
    transfer.mutate({ amount, recipient });
  };

  const closePopup = () => {
    setMessage(null);
  };

  return (
    <div className="md:w-80 border-4 border-customLight rounded-lg lg:w-96 w-72 mt-12 ">
      <h3 className="text-3xl text-center mb-1">Transfer</h3>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 px-4 pb-4"
      >
        <input
          min="0"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded-sm"
        />
        <input
          type="email"
          placeholder="Recipient's Email"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="border p-2 rounded-sm"
        />
        <button type="submit" className="bg-white text-customDark2 p-2 rounded">
          Send
        </button>
      </form>
      {/* Popup */}
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
