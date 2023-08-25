import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; 
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Navigate } from 'react-router-dom';
import './Login.css'; 

const Login = () => {
  const [user] = useAuthState(auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

   if (user) {
     return <Navigate to="/" />;
   }

  return (
    <div className="wrapper">
      
    <div className="login-container">
      <h2>Andnet Garment</h2>
      <h2 className="login-title">Sign In</h2>
      <div className="login-input">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="login-input">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="login-button" onClick={handleSignIn}>Sign In</button>
    
    </div>
    </div>
  );
};

export default Login;
