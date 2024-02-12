import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
  });

  function submitLogin(e) {
    e.preventDefault();
    client.post(
      "/api/login/",
      {
        email,
        password
      }
    ).then(function(res) {
      navigate('/Parser');
      // Handle successful login
    }).catch(function(error) {
      console.error("Login error:", error);
      // Handle login error
    });
  }

  return (
    <>
      <div className="login">
        <div className="login_container">
          <h1>Login</h1>
          <form className="login_form" onSubmit={submitLogin}>
            <div className="login_form_content">
              <input
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="check">
                <input type="checkbox" name="checkbox" />
                <p>I agree to terms and conditions</p>
              </div>
              <button type="submit">Sign in</button>
              <p>
                Don't have an account? <Link to="/register">Register Now</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
