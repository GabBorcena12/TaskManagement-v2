import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../actions/userAction";
import "../styling/login.css";

const Login = ({ submitLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const currentDateTime = new Date().toLocaleString();
    const userData = {
      username,
      password,
      email: username + "@gmail.com",
      datetime: currentDateTime,
    };
    dispatch(loginSuccess(userData));

    setUsername("");
    setPassword("");
    submitLogin();
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
