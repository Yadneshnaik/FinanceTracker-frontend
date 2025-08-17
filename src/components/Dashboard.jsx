import React, { useState, useEffect } from "react";
import axios from "axios";
import Transactions from "./Transactions";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchTransactions = async () => {
    const res = await axios.get("https://financetracker-backend-6xbt.onrender.com/api/transactions", {
      headers: { Authorization: token }
    });
    setTransactions(res.data);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      <Transactions fetchTransactions={fetchTransactions} transactions={transactions} />
    </div>
  );
}
