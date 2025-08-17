import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const token = localStorage.getItem("token");

  return (
    <div className="container mt-5 text-center">
      {!token ? (
        <>
          <h1>Welcome to Finance Tracker!</h1>
          <p className="mt-3">
            Track your expenses, manage your income, and stay on top of your finances.
          </p>
          <div className="mt-4">
            <Link to="/login" className="btn btn-primary me-2">
              Login
            </Link>
            <Link to="/signup" className="btn btn-success">
              Sign Up
            </Link>
          </div>
        </>
      ) : (
        <h2>Welcome back! Go to your <Link to="/dashboard">Dashboard</Link></h2>
      )}
    </div>
  );
}
