import React, { useState, useEffect } from 'react';
import { Container, Header as SUIHeader, Segment, Dimmer, Loader, Message, Table, Icon, Button, Form, Input, Checkbox, Divider, Modal, Dropdown } from 'semantic-ui-react'; // Fix: Aliased Header as SUIHeader
import { useNavigate, Link } from 'react-router-dom';
import UserService from '../../services/UserService';
import AuthService from '../../services/AuthService';

const ManageUsers = () => {
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formFeedback, setFormFeedback] = useState({ message: '', type: '' });

  const [currentEditUser, setCurrentEditUser] = useState(null); // For edit roles modal
  const [rolesModalOpen, setRolesModalOpen] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);

  // Available roles (must match your backend Role enum: CUSTOMER, ADMIN, RENTAL_AGENT)
  const roleOptions = [
    { key: 'customer', text: 'CUSTOMER', value: 'CUSTOMER' },
    { key: 'admin', text: 'ADMIN', value: 'ADMIN' },
    { key: 'rental_agent', text: 'RENTAL_AGENT', value: 'RENTAL_AGENT' },
  ];

  // Redirect if not logged in or not an ADMIN
  useEffect(() => {
    if (!currentUser || !currentUser.userId || !currentUser.roles.includes('ADMIN')) {
      navigate('/login'); // Redirect to login if not authenticated or not admin
      return;
    }
  }, [currentUser, navigate]);

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await UserService.getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users for admin:", err);
      setError('Failed to load users. Please ensure you are logged in as an Admin.');
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); // Re-fetch if currentUser changes

  // Open Roles Edit Modal
  const handleEditRolesClick = (user) => {
    setCurrentEditUser(user);
    setSelectedRoles(user.roles || []); // Initialize with current roles
    setFormFeedback({ message: '', type: '' }); // Clear feedback
    setRolesModalOpen(true);
  };

  // Handle Role Dropdown Change
  const handleRoleChange = (e, { value }) => {
    setSelectedRoles(value);
  };

  // Handle Update Roles Submission
  const handleUpdateRolesSubmit = async () => {
    setFormLoading(true);
    setFormFeedback({ message: '', type: '' });

    if (!currentEditUser) {
      setFormFeedback({ message: 'No user selected for role update.', type: 'error' });
      setFormLoading(false);
      return;
    }

    try {
      await UserService.updateUserRoles(currentEditUser.id, selectedRoles);
      setFormFeedback({ message: 'User roles updated successfully!', type: 'success' });
      fetchUsers(); // Refresh user list
      setTimeout(() => setRolesModalOpen(false), 1500); // Close modal after success
    } catch (err) {
      setFormLoading(false);
      let errorMessage = 'Failed to update user roles.';
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
      setFormFeedback({ message: errorMessage, type: 'error' });
      console.error("Update roles error:", err);
    } finally {
      setFormLoading(false);
    }
  };

  // Handle Delete User
  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone and will also delete associated bookings and reviews.')) {
      setLoading(true); // Show global loading while deleting
      setError('');
      try {
        await UserService.deleteUser(userId);
        setFormFeedback({ message: 'User deleted successfully!', type: 'success' });
        fetchUsers(); // Refresh user list
      } catch (err) {
        setLoading(false);
        let errorMessage = 'Failed to delete user.';
        if (err.response && err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        } else if (err.message) {
          errorMessage = err.message;
        }
        setError(errorMessage);
        console.error("Delete user error:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Display loading state for initial fetch
  if (loading && !error && users.length === 0) {
    return (
      <Segment style={{ minHeight: 'calc(100vh - 150px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Dimmer active inverted>
          <Loader inverted>Loading Users...</Loader>
        </Dimmer>
      </Segment>
    );
  }

  // Display error state for initial fetch
  if (error) {
    return (
      <Container style={{ marginTop: '2em', marginBottom: '2em' }}>
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{error}</p>
          {!currentUser || !currentUser.roles.includes('ADMIN') && (
            <p>Please <Link to="/login">login as an administrator</Link> to manage users.</p>
          )}
        </Message>
      </Container>
    );
  }

  // If not admin, or not logged in, should be redirected by useEffect, but a fallback
  if (!currentUser || !currentUser.roles.includes('ADMIN')) {
    return (
      <Container style={{ marginTop: '2em', marginBottom: '2em' }}>
        <Message negative>
          <Message.Header>Access Denied</Message.Header>
          <p>You do not have administrative privileges to view this page. Please login with an admin account.</p>
          <Button primary onClick={() => navigate('/login')} style={{ backgroundColor: '#214EFF', borderRadius: '5px' }}>Go to Login</Button>
        </Message>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: '2em', marginBottom: '2em' }}>
      <SUIHeader as='h2' textAlign='center' style={{ color: '#333', marginTop: '2em' }}>
        <Icon name='users' /> Manage User Accounts
      </SUIHeader>
      <Divider />

      {formFeedback.message && (
        <Message
          negative={formFeedback.type === 'error'}
          positive={formFeedback.type === 'success'}
          style={{ marginTop: '1em' }}
        >
          <Message.Header>{formFeedback.type === 'error' ? 'Operation Failed' : 'Operation Successful'}</Message.Header>
          <p>{formFeedback.message}</p>
        </Message>
      )}

      {users.length === 0 && !loading && !error ? (
        <Message info>
          <Message.Header>No Users Found</Message.Header>
          <p>There are no users registered in the system yet.</p>
        </Message>
      ) : (
        <Table celled selectable style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)' }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Phone Number</Table.HeaderCell>
              <Table.HeaderCell>Roles</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.id}</Table.Cell>
                <Table.Cell>{user.firstName}</Table.Cell>
                <Table.Cell>{user.lastName}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.phoneNumber || 'N/A'}</Table.Cell>
                <Table.Cell>
                  {user.roles && user.roles.map(role => (
                    <span key={role} className={`ui label ${role === 'ADMIN' ? 'red' : role === 'RENTAL_AGENT' ? 'blue' : 'green'}`} style={{ marginRight: '5px', marginBottom: '5px' }}>
                      {role}
                    </span>
                  ))}
                </Table.Cell>
                <Table.Cell>
                  <Button icon primary size='small' onClick={() => handleEditRolesClick(user)} style={{ backgroundColor: '#214EFF', borderRadius: '5px', marginRight: '5px' }}>
                    <Icon name='edit' /> Roles
                  </Button>
                  <Button icon negative size='small' onClick={() => handleDeleteUser(user.id)} style={{ borderRadius: '5px' }} disabled={user.id === currentUser.userId}>
                    <Icon name='trash' /> Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}

      {/* Modal for updating user roles */}
      <Modal
        onClose={() => setRolesModalOpen(false)}
        onOpen={() => setRolesModalOpen(true)}
        open={rolesModalOpen}
        size='tiny'
        closeIcon
      >
        <Modal.Header>Update Roles for {currentEditUser?.email}</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleUpdateRolesSubmit} loading={formLoading} success={formFeedback.type === 'success'} error={formFeedback.type === 'error'}>
            <Form.Field>
              <label>Select Roles</label>
              <Dropdown
                placeholder='Select Roles'
                fluid
                multiple
                selection
                options={roleOptions}
                value={selectedRoles}
                onChange={handleRoleChange}
              />
            </Form.Field>
            {formFeedback.message && (
              formFeedback.type === 'success' ? (
                <Message success header="Success" content={formFeedback.message} />
              ) : (
                <Message error header="Error" content={formFeedback.message} />
              )
            )}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setRolesModalOpen(false)}>Cancel</Button>
          <Button
            primary
            onClick={handleUpdateRolesSubmit}
            loading={formLoading}
            disabled={formLoading}
            style={{ backgroundColor: '#214EFF', borderRadius: '5px' }}
          >
            Update Roles
          </Button>
        </Modal.Actions>
      </Modal>
    </Container>
  );
};

export default ManageUsers;