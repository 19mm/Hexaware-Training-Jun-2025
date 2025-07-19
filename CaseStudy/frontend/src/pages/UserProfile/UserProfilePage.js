import React, { useState, useEffect } from 'react';
import { Container, Header as SUIHeader, Segment, Dimmer, Loader, Message, Form, Input, Button, Icon } from 'semantic-ui-react';
import { useNavigate, Link } from 'react-router-dom';
import UserService from '../../services/UserService';
import AuthService from '../../services/AuthService';

const UserProfilePage = () => {
  const navigate = useNavigate();
  
  const userId = AuthService.getCurrentUser()?.userId;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updateFeedback, setUpdateFeedback] = useState({ message: '', type: '' });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }

    const fetchUserProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await UserService.getUserById(userId);
        setFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phoneNumber: data.phoneNumber || '',
        });
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError('Failed to load user profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId, navigate]);

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateFeedback({ message: '', type: '' });

    try {
      const updatedUser = await UserService.updateUserProfile(
        userId,
        formData.firstName,
        formData.lastName,
        formData.phoneNumber
      );
      setUpdateFeedback({ message: 'Profile updated successfully!', type: 'success' });
      const currentUserData = AuthService.getCurrentUser();
      localStorage.setItem('user', JSON.stringify({ ...currentUserData, ...updatedUser }));

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update profile.';
      setUpdateFeedback({ message: errorMessage, type: 'error' });
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <Segment style={{ minHeight: 'calc(100vh - 150px)', display: 'flex' }}>
        <Dimmer active inverted><Loader inverted>Loading User Profile...</Loader></Dimmer>
      </Segment>
    );
  }

  if (error) {
    return (
      <Container style={{ marginTop: '2em' }}>
        <Message negative header='Error Loading Profile' content={error} />
      </Container>
    );
  }

  return (
    <Segment inverted style={{ minHeight: 'calc(100vh - 150px)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4F7F6' }}>
      <Segment style={{ padding: '3em', width: '550px', borderRadius: '10px', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
        <SUIHeader as='h2' textAlign='center' style={{ color: '#333' }}>
          <Icon name='address card outline' /> My Profile
        </SUIHeader>

        {updateFeedback.message && (
          <Message
            positive={updateFeedback.type === 'success'}
            negative={updateFeedback.type === 'error'}
          >
            <p>{updateFeedback.message}</p>
          </Message>
        )}

        <Form onSubmit={handleSubmit} loading={isUpdating}>
          <Form.Input
            label='First Name'
            icon='user'
            iconPosition='left'
            placeholder='First Name'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
            required
            style={{ marginBottom: '0em' }} 
          />
          <Form.Input
            label='Last Name'
            icon='user'
            iconPosition='left'
            placeholder='Last Name'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          
          <Form.Input
            label='Email (Not Editable)'
            icon='mail'
            iconPosition='left'
            name='email'
            value={formData.email}
            readOnly
            disabled
            style={{ marginTop: '0em' }}
          />
          <Form.Input
            label='Phone Number'
            icon='phone'
            iconPosition='left'
            name='phoneNumber'
            value={formData.phoneNumber}
            onChange={handleChange}
            style={{ marginTop: '0em' }}
          />

          <Button
            primary
            fluid
            size='large'
            type='submit'
            disabled={isUpdating}
            style={{ marginTop: '2em' , backgroundColor:'#1240faff' }}
          >
            {isUpdating ? 'Updating...' : 'Update Profile'}
          </Button>
        </Form>
      </Segment>
    </Segment>
  );
};

export default UserProfilePage;