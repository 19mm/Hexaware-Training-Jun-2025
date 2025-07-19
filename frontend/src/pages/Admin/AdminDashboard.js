import React, { useEffect, useState } from 'react';
import { Container, Header as SUIHeader, Segment, Icon, Button, Message, Grid, Divider } from 'semantic-ui-react'; 
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../../services/AuthService'; 

const AdminDashboard = () => {
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!currentUser || !currentUser.userId) {
      navigate('/login');
      return;
    }
    if (currentUser.roles && currentUser.roles.includes('ADMIN')) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [currentUser, navigate]);

  if (!isAdmin) {
    return (
      <Container style={{ marginTop: '2em', marginBottom: '2em', minHeight: 'calc(100vh - 150px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Message negative icon>
          <Icon name='lock' />
          <Message.Content>
            <Message.Header>Access Denied</Message.Header>
            <p>You do not have administrative privileges to view this page.</p>
            <Button primary onClick={() => navigate('/login')} style={{ backgroundColor: '#214EFF', borderRadius: '5px' }}>Go to Login</Button>
          </Message.Content>
        </Message>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: '2em', marginBottom: '2em' }}>
      <Segment style={{ padding: '3em', borderRadius: '10px', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
        <SUIHeader as='h2' textAlign='center' style={{ color: '#333', marginBottom: '1em' }}>
          <Icon name='dashboard' /> Administrator Dashboard
        </SUIHeader>

        <Message info>
          <Message.Header>Welcome, {currentUser.firstName || currentUser.email}!</Message.Header>
          <p>This is your central hub for managing the RoadReady Car Rental Platform.</p>
        </Message>

        <Grid stackable columns={2} style={{ marginTop: '2em' }}>
          <Grid.Column>
            <Segment raised style={{ borderRadius: '8px', boxShadow: '0px 2px 8px rgba(0,0,0,0.05)' }}>
              <SUIHeader as='h3' style={{ color: '#214EFF' }}> 
                <Icon name='car' /> Car Management
              </SUIHeader>
              <p>Add, update, and delete car listings.</p>
              <Button primary as={Link} to="/admin/manage-cars" fluid style={{ backgroundColor: '#214EFF', borderRadius: '5px' }}>
                Go to Manage Cars
              </Button>
            </Segment>
          </Grid.Column>

          <Grid.Column>
            <Segment raised style={{ borderRadius: '8px', boxShadow: '0px 2px 8px rgba(0,0,0,0.05)' }}>
              <SUIHeader as='h3' style={{ color: '#214EFF' }}> 
                <Icon name='users' /> User Management
              </SUIHeader>
              <p>View all users, manage roles, and delete accounts.</p>
              <Button primary as={Link} to="/admin/manage-users" fluid style={{ backgroundColor: '#214EFF', borderRadius: '5px' }}>
                Go to Manage Users
              </Button>
            </Segment>
          </Grid.Column>

          <Grid.Column>
            <Segment raised style={{ borderRadius: '8px', boxShadow: '0px 2px 8px rgba(0,0,0,0.05)' }}>
              <SUIHeader as='h3' style={{ color: '#214EFF' }}> 
                <Icon name='book' /> Booking Oversight
              </SUIHeader>
              <p>Monitor all bookings, update statuses, and manage cancellations.</p>
              <Button primary as={Link} to="/admin/manage-bookings" fluid style={{ backgroundColor: '#214EFF', borderRadius: '5px' }}>
                Manage Bookings
              </Button>
            </Segment>
          </Grid.Column>

          <Grid.Column>
            <Segment raised style={{ borderRadius: '8px', boxShadow: '0px 2px 8px rgba(0,0,0,0.05)' }}>
              <SUIHeader as='h3' style={{ color: '#214EFF' }}>
                <Icon name='money bill alternate outline' /> Payment Records
              </SUIHeader>
              <p>Review all payment transactions and financial records.</p>
              <Button primary as={Link} to="/admin/manage-payments" fluid style={{ backgroundColor: '#214EFF', borderRadius: '5px' }}>
                View Payments
              </Button>
            </Segment>
          </Grid.Column>
        </Grid>
      </Segment>
    </Container>
  );
};

export default AdminDashboard;
