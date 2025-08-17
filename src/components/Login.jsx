import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic frontend validation
    if (!form.email || !form.password) {
      setError("Both email and password are required!");
      return;
    }

    try {
      const res = await axios.post(
        "https://financetracker-backend-6xbt.onrender.com/api/auth/login",
        form
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Invalid credentials. Please try again."
      );
    }
  };

  return (
    <div className="min-vh-100 bg-gradient-success d-flex align-items-center">
      <div className="container-fluid px-0">
        <div className="row g-0 min-vh-100">
          <div className="col-12">
            <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 px-4">
              <div className="w-100" style={{maxWidth: '500px'}}>
                <div className="card shadow-lg border-0">
                  <div className="card-body p-5">
                    <h2 className="card-title text-center mb-4 fw-bold">
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Welcome Back
                    </h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="email" className="form-label fw-semibold">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          id="email"
                          placeholder="Enter your email"
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="password" className="form-label fw-semibold">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          id="password"
                          placeholder="Enter your password"
                          value={form.password}
                          onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                          }
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-success btn-lg w-100 py-3 fw-bold">
                        <i className="bi bi-unlock me-2"></i>
                        Sign In
                      </button>
                    </form>
                    <div className="text-center mt-4">
                      <p className="mb-0 fs-5">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-decoration-none fw-bold">
                          Create Account
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-gradient-success {
          background: linear-gradient(135deg, #198754 0%, #157347 100%);
        }
      `}</style>
    </div>
  );
}
