import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react'
import axios from "axios"

const Register = () => {
  const [username,setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword,setCPassword] = useState('')
  const [registrationState, setRegistrationState] = useState('');
  const navigate = useNavigate();


  const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      setRegistrationState('error');
      return;
    }
    client.post("/api/register/", { email, username, password })
      .then(function (res) {
        // Registration successful
        setRegistrationState('success');
        navigate('/Login');
      })
      .catch(function (error) {
        // Registration failed
        setRegistrationState('error');
      });
  };

  return (
    <>
      <div className="register">
        <form onSubmit={handleSubmit}>
          <div className="register_form">
            <h1>Register</h1>
            <h4>Please fill in this form to create an account.</h4>
            <hr />
            <input
             type="text"
             placeholder="Enter your Name"
             id="username"
             name="username"
             value={username}
             onChange={(e) => setUsername(e.target.value)}
             autoComplete="off"
             required
            />


            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={email} 
              onChange={(e)=>{setEmail(e.target.value)}}
              id="email"
              autoComplete="off"
              required
            />

            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              value={password} 
              onChange={(e)=>{setPassword(e.target.value)}}
              id="psw"
              autoComplete="off"
              required
            />
            <input
              type="password"
              placeholder="Repeat Password"
              name="psw-repeat"
              value={cpassword} 
              onChange={(e)=>{setCPassword(e.target.value)}}
              id="psw-repeat"
              autoComplete="off"
              required
            />
            <p>
              By creating an account you agree to our
              <a href="#">Terms & Privacy</a>
            </p>
            <button type="submit" className="registerbtn">
              Register
            </button>
            {registrationState === 'error' && (
              <p>Registration failed. Please check your details and try again.</p>
            )}
            {registrationState === 'success' && (
              <p>Account created successfully! Please sign in with your details.</p>
            )}
            <p>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
