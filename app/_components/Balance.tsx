"use client";
import { useEffect, useState } from "react";
import Loading from "./Loading";

export default function Balance() {
  const [balance, setBalance] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/user-data");
        const data = await res.json();

        if (res.ok) {
          setBalance(data.user.balance);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to data");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);
  if (loading) {
    return <Loading />;
  }

  return <div className="text-2xl">Sold:{balance}$</div>;
}
