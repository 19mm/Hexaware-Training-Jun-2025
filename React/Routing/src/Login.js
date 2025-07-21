import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    const loginData = { username, password };

    axios.post('http://localhost:8085/api/auth/login', loginData)
      .then(response => {
        const token = response.data;
        console.log(token);
        localStorage.setItem('token', token);
        alert('Login successful!');
        navigate('/books');
      })
      .catch(error => {
        console.error('There was an error logging in!', error);
        alert('Login failed! Please check your credentials.');
      });
  };

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={loginUser}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;