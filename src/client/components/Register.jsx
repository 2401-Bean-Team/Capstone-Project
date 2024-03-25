import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = ({ setToken, token, setEmail, email }) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');


      const fetchUserData = async (email, token) => {

        try {
          const { data } = await axios.get(`/api/users/me?email=${email}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log("USER DATA", data.user);
          createOrder(data.user.id, token)
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };


  const createOrder = async (userId, token)=> {

    await axios.post(`/api/orders/newOrder/${userId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }


  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const register = async() => {
    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });
        const result = await response.json();
        await setToken(result.token)
        console.log('result: ', result)
        setMessage(result.message);
        fetchUserData(email, result.token)
        if(!response.ok) {
          throw(result)
        }
        setName('');
        setPassword('');
    } catch (err) {
        console.error(`${err.name}: ${err.message}`);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
  };





  return (
    <div className='adminlog' >

      <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div>
          <label htmlFor="name">Name:</label>
          <input
                     placeholder='Name'

            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
                    placeholder='Email'

            type="text"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
           placeholder='Password'

            type="text"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button
        className='butto' type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Register;

/*export default function Register() {
    return <h1>Register</h1>
}*/
