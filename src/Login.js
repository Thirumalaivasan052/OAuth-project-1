// src/Login.js
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './Login.css';

function Login() {
  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/google", {
        token: credentialResponse.credential,
      });
      alert("Login Success: " + res.data.name);
    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <p>Continue with your Google Account</p>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => alert("Google Sign-In Failed")}
      />
    </div>
  );
}

export default Login;
