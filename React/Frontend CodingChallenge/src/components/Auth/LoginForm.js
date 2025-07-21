import React, { useState } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const handleChange = (e, { name, value }) => {
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:9090/auth/login', credentials);

      const token = response.data.jwt;
      if (!token || !token.includes('.')) {
        throw new Error('Invalid token received from backend');
      }

      localStorage.setItem('token', token);
      setFeedback({ message: 'Login successful', type: 'success' });

      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      const msg = err.response?.data || 'Login failed';
      setFeedback({ message: msg, type: 'error' });
    }
  };

  return (
    <Form onSubmit={handleSubmit} success={feedback.type === 'success'} error={feedback.type === 'error'}>
      <Form.Input
        label="Username"
        name="username"
        placeholder="Enter username"
        value={credentials.username}
        onChange={handleChange}
        required
      />
      <Form.Input
        label="Password"
        name="password"
        type="password"
        placeholder="Enter password"
        value={credentials.password}
        onChange={handleChange}
        required
      />
      {feedback.message && (
        feedback.type === 'success' ? (
          <Message success header="Success" content={feedback.message} />
        ) : (
          <Message error header="Error" content={feedback.message} />
        )
      )}
      <Button color="blue" type="submit">Login</Button>
    </Form>
  );
};

export default LoginForm;