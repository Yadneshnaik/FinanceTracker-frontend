import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", contact: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic frontend validation
    if (!form.name || !form.email || !form.password || !form.contact) {
      setError("All fields are required!");
      return;
    }

    try {
      await axios.post("https://financetracker-backend-6xbt.onrender.com/api/auth/register", form);
      alert("Registered Successfully. Please Login!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    }
  };

  return (
    <div className="min-vh-100 bg-gradient-primary d-flex align-items-center">
      <div className="container-fluid px-0">
        <div className="row g-0 min-vh-100">
          <div className="col-12">
            <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 px-4">
              <div className="w-100" style={{maxWidth: '500px'}}>
                <div className="card shadow-lg border-0">
                  <div className="card-body p-5">
                    <h2 className="card-title text-center mb-4 fw-bold">
                      <i className="bi bi-person-plus me-2"></i>
                      Create Account
                    </h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="name" className="form-label fw-semibold">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          id="name"
                          placeholder="Enter your full name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          required
                        />
                      </div>
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
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="contact" className="form-label fw-semibold">
                          Contact Number
                        </label>
                        <input
                          type="tel"
                          className="form-control form-control-lg"
                          id="contact"
                          placeholder="Enter your contact number"
                          value={form.contact}
                          onChange={(e) => setForm({ ...form, contact: e.target.value })}
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
                          placeholder="Create a strong password"
                          value={form.password}
                          onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                          }
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary btn-lg w-100 py-3 fw-bold">
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Create Account
                      </button>
                    </form>
                    <div className="text-center mt-4">
                      <p className="mb-0 fs-5">
                        Already have an account?{" "}
                        <Link to="/login" className="text-decoration-none fw-bold">
                          Sign In
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
        .bg-gradient-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
      `}</style>
    </div>
  );
}
