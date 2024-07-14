"use client";

import { useState } from "react";

export default function Transfer() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        recipient,
      }),
    });

    if (response.ok) {
      alert("Transfer successful");
      //Reset form
      setAmount("");
      setRecipient("");
    } else {
      alert("Transfer failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2"
      />
      <input
        type="email"
        placeholder="Recipient's Email"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="border p-2"
      />
      <button type="submit" className="bg-blue-500 text-customLight p-2">
        Send
      </button>
    </form>
  );
}
