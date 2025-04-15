import React, { useState } from "react";
import "./Login.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const res = await axios.post(
        "https://api.assortsmachinetools.com/api/v1/auth/sign-in",
        { email, password }
      );
      if (res.status === 200) {
        console.log(res.data);

        localStorage.setItem("token", res.data.token);

        toast.success("Login successful!");
        navigate("/dashboard");
        window.location.reload();
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error: " + error.response.data.message);
    }
  };

  const handleReset = async () => {
    try {
      if (!forgotEmail) {
        toast.error("Please enter your email");
        return;
      }
      await axios.post("https://api.assortsmachinetools.com/api/v1/auth/forgot-password", {
        email: forgotEmail,
      });
      toast.success(`Reset link sent to ${forgotEmail}`);
      setShowForgotModal(false);
      setForgotEmail("");
    } catch (error) {
      toast.error("Error: " + error.response.data.message);
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <div className="login-box">
          <h2>Welcome Back 👋</h2>
          <p>Please login to your admin panel</p>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="actions">
              <span onClick={() => setShowForgotModal(true)}>
                Forgot password?
              </span>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal-overlay">
          <div
            className="modal-content"
            style={{
              maxWidth: "400px",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          >
            <h3>Reset Password</h3>
            <p>Enter your email to receive reset instructions.</p>
            <input
              type="email"
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              required
            />
            <div className="modal-buttons">
              <button onClick={handleReset}>Send Reset Link</button>
              <button
                className="cancel"
                onClick={() => setShowForgotModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
