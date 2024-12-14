import React, { useState } from "react";
import toast from "react-hot-toast";
import "./style.css"; // CSS for styling
import { loginApi } from "../../api"; // API function for login
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required!");
      return;
    }

    try {
      const res = await loginApi({ email, password }); // Call login API

      if (res.data?.success) {
        localStorage.setItem("BlogVerse-token", res.data?.token);
        localStorage.setItem("BlogVerse-userName", res.data?.userName);
        localStorage.setItem("BlogVerse-userAvatar", res.data?.userAvatar);
        dispatch(login());
        toast.success("Login successful!");
        navigate("/"); // Redirect to dashboard or home page
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(error.response.data.message);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="reg-login">
      <div className="reg-header">
        <h2>Login</h2>
      </div>
      <form onSubmit={handleFormSubmit} className="reg-form">
        {/* Email Input */}
        <div className="reg-form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="reg-form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="reg-submit-btn">
          Login
        </button>
      </form>

      <div className="reg-footer">
        <p>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="reg-register-link"
          >
            Register Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
