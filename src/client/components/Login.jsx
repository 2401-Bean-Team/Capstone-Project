import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = ({ setToken, setEmail, email }) => {
  const navigate = useNavigate();  
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    console.log("Email before setting:", email); // Log before setting
    setEmail(e.target.value);
    console.log("Email after setting:", e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      const result = await response.json();
      setMessage(result.message);
      if (response.ok) {
        setToken(result.token); // Set the token upon successful login
        //navigate('/account'); // Redirect to the account page
      } else {
        throw result;
      } 
      setPassword('');
    } catch (err) {
      console.error(`${err.name}: ${err.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;
