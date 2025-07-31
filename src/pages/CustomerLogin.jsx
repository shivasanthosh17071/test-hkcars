import { useState, useEffect } from "react";
import axios from "../api/axiosConfig";
import { Phone, Lock, Key, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [mode, setMode] = useState("login");
  const [step, setStep] = useState("form");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      navigate("/");
    }
  }, [navigate]);

  const reset = () => {
    setEmail("");
    setMobile("");
    setOtp("");
    setName("");
    setPassword("");
    setStep("form");
    setError("");
    setMessage("");
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (mode === "register") {
        await axios.post(`users/send-otp`, { email, mobile });
      } else if (mode === "forgot") {
        await axios.post(`users/forgot-password`, { email });
      }

      setStep("otp");
      setMessage("OTP sent to your email.");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpAndRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await axios.post(`users/verify-otp`, {
        name,
        email,
        mobile,
        otp,
        password,
      });
      localStorage.setItem("userToken", res.data.token);
      setMessage("Registration successful! Please login.");
      setTimeout(() => {
        reset();
        setMode("login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await axios.post(`/users/reset-password`, {
        email,
        otp,
        password,
      });
      setMessage("Password reset successfully! You can now login.");
      setTimeout(() => {
        reset();
        setMode("login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Password reset failed.");
    } finally {
      setLoading(false);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await axios.post(`users/login`, {
        mobile,
        password,
      });

      localStorage.setItem("userToken", res.data.token);

      const userDataRes = await axios.get("/users/customerData", {
        headers: {
          Authorization: `Bearer ${res.data.token}`,
        },
      });

      localStorage.setItem("userData", JSON.stringify(userDataRes.data));
      setUser(userDataRes.data.name);
      setMessage("Login successful!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      axios
        .get("/users/customerData", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => {
          localStorage.setItem("userData", JSON.stringify(res.data));
          setUser(res.data.name);
        })
        .catch((err) => {
          console.error("Fetch user failed", err);
        });
    }
  }, []);

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow">
              <div className="card-body p-4">
                <div className="text-center mb-3">
                  <h4 className="fw-bold">
                    {mode === "login"
                      ? "Login"
                      : mode === "register"
                      ? "Register"
                      : "Forgot Password"}
                  </h4>
                  <p className="text-muted mb-0">
                    {mode === "login"
                      ? "Login using mobile and password"
                      : step === "form"
                      ? "Enter your info"
                      : "Verify OTP & Proceed"}
                  </p>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}
                {message && (
                  <div className="alert alert-success">{message}</div>
                )}

                {/* Step 1 - Email and Mobile */}
                {(mode === "register" || mode === "forgot") &&
                  step === "form" && (
                    <form onSubmit={sendOtp}>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <div className="input-group">
                          <span className="input-group-text">@</span>
                          <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            required
                          />
                        </div>
                      </div>

                      {mode === "register" && (
                        <div className="mb-3">
                          <label className="form-label">Mobile</label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <Phone size={16} />
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              value={mobile}
                              onChange={(e) => setMobile(e.target.value)}
                              placeholder="Enter mobile"
                              required
                            />
                          </div>
                        </div>
                      )}

                      <button
                        className="btn btn-primary w-100"
                        disabled={loading}
                      >
                        {loading ? "Sending OTP..." : "Send OTP"}
                      </button>
                    </form>
                  )}

                {/* Step 2 - OTP + Full Name + Password (Register) */}
                {mode === "register" && step === "otp" && (
                  <form onSubmit={verifyOtpAndRegister}>
                    <div className="mb-3">
                      <label className="form-label">OTP</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <Key size={16} />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="Enter OTP"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Full Name</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <User size={16} />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Password</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <Lock size={16} />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Set a password"
                          required
                        />
                      </div>
                    </div>

                    <button
                      className="btn btn-success w-100"
                      disabled={loading}
                    >
                      {loading ? "Registering..." : "Register"}
                    </button>
                  </form>
                )}

                {/* Step 2 - OTP + New Password (Forgot Password) */}
                {mode === "forgot" && step === "otp" && (
                  <form onSubmit={resetPassword}>
                    <div className="mb-3">
                      <label className="form-label">OTP</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <Key size={16} />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="Enter OTP"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label">New Password</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <Lock size={16} />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter new password"
                          required
                        />
                      </div>
                    </div>

                    <button className="btn btn-success w-100" disabled={loading}>
                      {loading ? "Resetting..." : "Reset Password"}
                    </button>
                  </form>
                )}

                {/* Login */}
                {mode === "login" && (
                  <form onSubmit={login}>
                    <div className="mb-3">
                      <label className="form-label">Mobile</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <Phone size={16} />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          placeholder="Enter mobile"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Password</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <Lock size={16} />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter password"
                          required
                        />
                      </div>
                    </div>

                    <button
                      className="btn btn-primary w-100"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Login"}
                    </button>
                  </form>
                )}

                <div className="text-center mt-3">
                  {mode === "login" ? (
                    <>
                      <p>
                        New user?{" "}
                        <button
                          className="btn btn-link p-0"
                          onClick={() => {
                            reset();
                            setMode("register");
                          }}
                        >
                          Register
                        </button>
                      </p>
                      <p>
                        Forgot password?{" "}
                        <button
                          className="btn btn-link p-0"
                          onClick={() => {
                            reset();
                            setMode("forgot");
                          }}
                        >
                          Reset
                        </button>
                      </p>
                    </>
                  ) : (
                    <p>
                      Already have an account?{" "}
                      <button
                        className="btn btn-link p-0"
                        onClick={() => {
                          reset();
                          setMode("login");
                        }}
                      >
                        Login
                      </button>
                    </p>
                  )}
                </div>

                {user && (
                  <div className="alert alert-success text-center mt-3">
                    Thanks for logging in, {user}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
