import React, { useState, useEffect } from 'react';
import { Container, Header as SUIHeader, Segment, Dimmer, Loader, Message, Table, Icon, Button, Divider } from 'semantic-ui-react'; 
import { useNavigate, Link } from 'react-router-dom';
import PaymentService from '../../services/PaymentService';
import AuthService from '../../services/AuthService';

const ManagePayments = () => {
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!currentUser || !currentUser.userId || !currentUser.roles.includes('ADMIN')) {
      navigate('/login'); 
      return;
    }
  }, [currentUser, navigate]);

  const fetchAllPayments = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await PaymentService.getAllPayments();
      setPayments(data);
    } catch (err) {
      console.error("Error fetching all payments for admin:", err);
      setError('Failed to load all payments. Please ensure you are logged in as an Admin.');
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPayments();
  }, []); 

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    const date = new Date(dateTimeString);
    return date.toLocaleString();
  };

  if (loading && !error && payments.length === 0) {
    return (
      <Segment style={{ minHeight: 'calc(100vh - 150px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Dimmer active inverted>
          <Loader inverted>Loading All Payments...</Loader>
        </Dimmer>
      </Segment>
    );
  }

  if (error) {
    return (
      <Container style={{ marginTop: '2em', marginBottom: '2em' }}>
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{error}</p>
          {!currentUser || !currentUser.roles.includes('ADMIN') && (
            <p>Please <Link to="/login">login as an administrator</Link> to view payment records.</p>
          )}
        </Message>
      </Container>
    );
  }

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
        <Icon name='money bill alternate outline' /> Manage All Payments
      </SUIHeader>
      <Divider />

      {payments.length === 0 && !loading && !error ? (
        <Message info>
          <Message.Header>No Payments Found</Message.Header>
          <p>There are no payment records in the system yet.</p>
        </Message>
      ) : (
        <Table celled selectable style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)' }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Booking ID</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Method</Table.HeaderCell>
              <Table.HeaderCell>Transaction ID</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Payment Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {payments.map((payment) => (
              <Table.Row key={payment.id}>
                <Table.Cell>{payment.id}</Table.Cell>
                <Table.Cell>{payment.bookingId}</Table.Cell>
                <Table.Cell>₹{payment.amount}</Table.Cell>
                <Table.Cell>{payment.paymentMethod}</Table.Cell>
                <Table.Cell>{payment.transactionId}</Table.Cell>
                <Table.Cell>
                  <span style={{ color: payment.status === 'SUCCESS' ? 'green' : payment.status === 'FAILED' ? 'red' : 'orange' }}>
                    {payment.status}
                  </span>
                </Table.Cell>
                <Table.Cell>{formatDateTime(payment.paymentDate)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Container>
  );
};

export default ManagePayments;
