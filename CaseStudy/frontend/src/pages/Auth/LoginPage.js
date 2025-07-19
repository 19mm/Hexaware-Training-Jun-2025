import React, { useState } from 'react';
import { Button, Form, Message, Segment, Header as SUIHeader, Icon } from 'semantic-ui-react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../../services/AuthService';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e, { name, value }) => {
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setFeedback({ message: '', type: '' });

    if (!credentials.email || !credentials.password) {
      setFeedback({ message: 'Please enter both email and password.', type: 'error' });
      setLoading(false);
      return;
    }

    try {
      const response = await AuthService.login(credentials.email, credentials.password);

      if (!response.jwtToken) {
        throw new Error('Login failed: No token received.');
      }

      if (response.roles && response.roles.includes('ADMIN')) {
        window.location.href = '/admin/';
      } else {
        window.location.href = '/'; 
      }

    } catch (err) {
      let errorMessage = 'Login failed. An unexpected error occurred.';
      if (err.response && err.response.data) {
        errorMessage = err.response.data.message || err.response.data.details || (typeof err.response.data === 'string' ? err.response.data : errorMessage);
      } else if (err.message) {
        errorMessage = err.message;
      }
      setFeedback({ message: errorMessage, type: 'error' });
      console.error("Login error:", err);
      setLoading(false);
    }
  };

  return (
    <Segment
      vertical
      style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f4f4f4',
        padding: '2em 0',
      }}
    >
      <Segment
        style={{
          padding: '4em',
          width: 'clamp(350px, 80%, 500px)',
          borderRadius: '15px',
          boxShadow: '0px 15px 40px rgba(0, 0, 0, 0.15)',
          backgroundColor: 'white',
          border: '1px solid rgba(0,0,0,0.05)',
        }}
      >
        <SUIHeader as='h1' textAlign='center' style={{ color: '#214EFF', marginBottom: '1.5em', fontSize: '2em' }}>
          <Icon name='lock' style={{ marginRight: '0.2em' }} /> Secure Login
        </SUIHeader>
        <Form onSubmit={handleSubmit} loading={loading} error={!!feedback.message}>
          <Form.Input
            label="Email"
            name="email"
            placeholder="your.email@example.com"
            type="email"
            value={credentials.email}
            onChange={handleChange}
            required
            icon='user'
            iconPosition='left'
            style={{ marginBottom: '1em' }}
          />
          <Form.Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={credentials.password}
            onChange={handleChange}
            required
            icon='lock'
            iconPosition='left'
            style={{ marginBottom: '1.5em' }}
          />
          {feedback.message && (
            <Message
              error
              header="Login Error"
              content={feedback.message}
              style={{ borderRadius: '8px' }}
            />
          )}
          <Button
            primary
            fluid
            size="medium"
            type='submit'
            loading={loading}
            disabled={loading}
            style={{ backgroundColor: '#214EFF', borderRadius: '8px', padding: '1em 0' }}
          >
            Login
          </Button>
        </Form>
        <Message style={{ marginTop: '2em', textAlign: 'center', backgroundColor: '#f8f8f8', border: 'none', boxShadow: 'none', borderRadius: '8px', padding: '1.5em' }}>
          New to us? <Link to="/register" style={{ color: '#214EFF', fontWeight: 'bold' }}>Register</Link>
        </Message>
      </Segment>
    </Segment>
  );
};

export default LoginPage;