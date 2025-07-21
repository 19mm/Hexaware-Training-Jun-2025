import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signupUser = (e) => {
    e.preventDefault();
    const signupData = {
      username: username,
      password: password,
    };

    axios.post('http://localhost:8085/api/auth/register', signupData)
      .then(response => {
        alert('Signup successful! You can now log in.');
        navigate('/login');
      })
      .catch(error => {
        console.error('There was an error signing up!', error);
        alert('Signup failed! Please try again.');
      });
  };

  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={signupUser}>
        <input
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;