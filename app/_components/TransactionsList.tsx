"use client";
import { useEffect, useState } from "react";
import Transaction from "./Transaction";

export default function TransactionsList() {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transfer");
        const data = await res.json();

        if (res.ok) {
          setTransactions(data.transactions);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        alert("Failed to fetch transactions");
      }
    };

    fetchTransactions();
  }, []);
  return (
    <div className="border-4 border-customLight rounded-lg">
      <h3 className=" text-3xl text-center">Transactions</h3>
      <div className="max-h-96 overflow-y-auto px-4 py-4">
        <ul className="space-y-2">
          {transactions.map((transaction: any) => (
            <Transaction key={transaction._id} transaction={transaction} />
          ))}
        </ul>
      </div>
    </div>
  );
}
