import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { auth, googleProvider, githubProvider } from './firebase-config';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = credentials;
      await axios.post('http://localhost:5001/api/login', { email, password });
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      try{
        await axios.post('http://localhost:5001/api/login', { email: user.email });
      }catch(loginErr){
        await axios.post('http://localhost:5001/api/register', {
          name: user.displayName || 'No Name',
          email: user.email,
          password: user.uid, // or token-based if backend supports it
        });
      }
      navigate('/home');
    } catch (err) {
      alert('Social login failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="form-group">
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit" className="login-btn">Login</button>
      </form>

      <p className="forgot-password">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>

      <div className="social-login">
        <button onClick={() => handleSocialLogin(googleProvider)} className="google-btn">Login with Google</button>
        <button onClick={() => handleSocialLogin(githubProvider)} className="github-btn">Login with GitHub</button>
      </div>
    </div>
  );
};

export default LoginPage;
