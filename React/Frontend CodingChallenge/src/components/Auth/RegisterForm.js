import React, { useState } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const handleChange = (e, { name, value }) => {
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:9090/auth/register', credentials);
      setFeedback({ message: response.data || 'User registered successfully', type: 'success' });

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      const msg = err.response?.data || 'Registration failed';
      setFeedback({ message: msg, type: 'error' });
    }
  };

  return (
    <Form onSubmit={handleSubmit} success={feedback.type === 'success'} error={feedback.type === 'error'}>
      <Form.Input
        label="Username"
        name="username"
        placeholder="Enter username"
        onChange={handleChange}
        value={credentials.username}
        required
      />
      <Form.Input
        label="Password"
        name="password"
        type="password"
        placeholder="Enter password"
        onChange={handleChange}
        value={credentials.password}
        required
      />
      {feedback.message && (
        feedback.type === 'success' ? (
          <Message success header="Success" content={feedback.message} />
        ) : (
          <Message error header="Error" content={feedback.message} />
        )
      )}
      <Button color="green" type="submit">Register</Button>
    </Form>
  );
};

export default RegisterForm;