
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Import your Firebase auth instance
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Navigate } from 'react-router-dom';

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
  
    // If the user is already authenticated, redirect them to the homepage
    if (user) {
      return <Navigate to="/" />;
    }
  
    return (
      <div>
        <h2>Sign In with Email and Password</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleSignIn}>Sign In</button>
        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    );
  };
  
  export default Login;
