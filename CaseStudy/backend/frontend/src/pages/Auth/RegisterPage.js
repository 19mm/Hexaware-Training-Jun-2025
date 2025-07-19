import React, { useState } from 'react';
import { Form, Input, Button, Message, Segment, Header as SUIHeader, Icon } from 'semantic-ui-react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../../services/AuthService'; 

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
  });
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true); 
    setFeedback({ message: '', type: '' }); 

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setFeedback({ message: 'Please fill in all required fields (First Name, Last Name, Email, Password).', type: 'error' });
      setLoading(false);
      return;
    }
    if (formData.password.length < 8) {
      setFeedback({ message: 'Password must be at least 8 characters long.', type: 'error' });
      setLoading(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFeedback({ message: 'Please enter a valid email address.', type: 'error' });
      setLoading(false);
      return;
    }

    try {
      const response = await AuthService.register(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password,
        formData.phoneNumber
      );

      setFeedback({ message: response || 'Registration successful! You can now log in.', type: 'success' });

      setTimeout(() => {
        navigate('/login');
      }, 2000); 

    } catch (err) {
      setLoading(false); 
      let errorMessage = 'Registration failed. An unexpected error occurred.';

      if (err.response && err.response.data) {
        if (err.response.data.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.data.details) {
          errorMessage = err.response.data.details; 
        } else if (typeof err.response.data === 'string') {
          errorMessage = err.response.data; 
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      setFeedback({ message: errorMessage, type: 'error' });
      console.error("Registration error:", err); 
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
          width: 'clamp(350px, 80%, 550px)', 
          borderRadius: '15px', 
          boxShadow: '0px 15px 40px rgba(0, 0, 0, 0.15)',
          backgroundColor: 'white',
          border: '1px solid rgba(0,0,0,0.05)', 
          marginTop:'1rem'
        }}
      >
        <SUIHeader as='h1' textAlign='center' style={{ color: '#214EFF', marginBottom: '0.8em', fontSize: '2.5em' }}> 
         <Icon name='user plus' style={{ marginRight: '0.3em' }} /> REGISTER
        </SUIHeader>
        <Form onSubmit={handleSubmit} loading={loading} success={feedback.type === 'success'} error={feedback.type === 'error'}>
          <Form.Field style={{ marginBottom: '1em' }}>
            <label>First Name</label>
            <Input
              icon='user'
              iconPosition='left'
              placeholder='Your First Name' 
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Form.Field>
          <Form.Field style={{ marginBottom: '1em' }}>
            <label>Last Name</label>
            <Input
              icon='user'
              iconPosition='left'
              placeholder='Your Last Name'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Form.Field>
          <Form.Field style={{ marginBottom: '1em' }}>
            <label>Email</label>
            <Input
              icon='mail'
              iconPosition='left'
              placeholder='your.email@example.com' 
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Field>
          <Form.Field style={{ marginBottom: '1em' }}> 
            <label>Password</label>
            <Input
              icon='lock'
              iconPosition='left'
              placeholder='Minimum 8 characters' 
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Field>
          <Form.Field style={{ marginBottom: '2em' }}> 
            <label>Phone Number (Optional)</label>
            <Input
              icon='phone'
              iconPosition='left'
              placeholder='e.g., +91 9876543210' 
              name='phoneNumber'
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </Form.Field>
          {feedback.message && (
            feedback.type === 'success' ? (
              <Message success header="Success" content={feedback.message} style={{ borderRadius: '8px' }} />
            ) : (
              <Message error header="Error" content={feedback.message} style={{ borderRadius: '8px' }} />
            )
          )}
          <Button
            primary
            fluid
            size='large'
            type='submit'
            loading={loading}
            disabled={loading}
            style={{ backgroundColor: '#214EFF', borderRadius: '8px', padding: '1em 0' }}
          >
            Register
          </Button>
        </Form>
        <Message style={{ marginTop: '1em', textAlign: 'center', backgroundColor: '#f8f8f8', border: 'none', boxShadow: 'none', borderRadius: '8px', padding: '1.5em' }}>
          Already have an account? <Link to="/login" style={{ color: '#214EFF', fontWeight: 'bold' }}>Log In</Link>
        </Message>
      </Segment>
    </Segment>
  );
};

export default RegisterPage;
