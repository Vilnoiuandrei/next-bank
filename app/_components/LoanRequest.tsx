"use client";

import { useState } from "react";

export default function Loan() {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/loan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
        }),
      });
      console.log(res);

      if (res.ok) {
        alert("Loan approved and balance updated");
        // Reset form
        setAmount("");
      }
    } catch (err: any) {
      setError(err);
      alert(error);
    }
  };

  return (
    <div className="w-52 border-4 border-customLight rounded-lg lg:w-72 xl:w-80 h-40">
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
