"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff } from "lucide-react";

import axios from "../../api/axiosConfig";
import { useAuth } from "../../AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    // Redirect to admin dashboard if token is already present
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [navigate, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("/auth/login", {
        email: formData.username, // Change to 'username' if backend expects that
        password: formData.password,
      });

      const { token } = response.data;
      localStorage.setItem("adminToken", token);

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light fade-in">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <div
                    className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <User size={30} />
                  </div>
                  <h3 className="card-title">Admin Login</h3>
                  <p className="text-muted">Access the admin dashboard</p>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} autoComplete="off">
                  <div className="mb-3">
                    <label className="form-label" htmlFor="username">
                      Username (Email)
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <User size={16} />
                      </span>
                      <input
                        id="username"
                        type="email"
                        className="form-control"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Enter email"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <Lock size={16} />
                      </span>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter password"
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
