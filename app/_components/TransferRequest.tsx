"use client";

import { useState } from "react";

export default function Transfer() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          recipient,
        }),
      });

      if (response.ok) {
        alert("Transfer successful");
        //Reset form
        setAmount("");
        setRecipient("");
        setError("");
      }
    } catch (err: any) {
      setError(err);
      alert(error);
    }
  };

  return (
    <div className="w-52 border-4 border-customLight rounded-lg ">
      <h3 className="text-3xl text-center mb-1">Transfer</h3>
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
    </div>
  );
}
