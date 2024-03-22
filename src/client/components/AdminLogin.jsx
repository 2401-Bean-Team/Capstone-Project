import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ setToken, setName, name }) => {
  const navigate = useNavigate();  
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleNameChange = (e) => {
    console.log("Name before setting:", name); // Log before setting
    setName(e.target.value);
    console.log("Name after setting:", e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const adminlogin = async () => {
    try {
      const response = await fetch('/api/adminuser/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          password
        })
      });
      const result = await response.json();
      setMessage(result.message);
      if (response.ok) {
        setToken(result.token); // Set the token upon successful login
        navigate('/adminpage'); // Redirect to the account page
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
    adminlogin();
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            type='name'
            id='name'
            value={name}
            onChange={handleNameChange}
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

export default AdminLogin;