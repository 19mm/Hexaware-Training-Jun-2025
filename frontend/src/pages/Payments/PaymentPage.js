import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Message,
  Segment,
  Header as SUIHeader,
  Icon,
  Divider,
  Select,
  Container,
} from 'semantic-ui-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import PaymentService from '../../services/PaymentService';
import AuthService from '../../services/AuthService';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [amount, setAmount] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const paymentMethodOptions = [
    { key: 'credit', text: 'Credit Card', value: 'Credit Card' },
    { key: 'debit', text: 'Debit Card', value: 'Debit Card' },
    { key: 'paypal', text: 'PayPal', value: 'PayPal' },
    { key: 'upi', text: 'UPI', value: 'UPI' },
  ];

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (!user || !user.userId) {
      navigate('/login');
    } else {
      setCurrentUser(user);
    }
  }, [navigate]);

  useEffect(() => {
    if (location?.state?.bookingId && location?.state?.totalAmount) {
      setBookingId(location.state.bookingId);
      setAmount(location.state.totalAmount);
    } else {
      setFeedback({
        message: 'No booking details provided for payment. Please make a booking first.',
        type: 'error',
      });
    }
  }, [location]);

  const handleSubmit = async () => {
    setLoading(true);
    setFeedback({ message: '', type: '' });

    if (!bookingId || !amount || !paymentMethod) {
      setFeedback({
        message: 'Please ensure all payment details are provided.',
        type: 'error',
      });
      setLoading(false);
      return;
    }

    try {
      const response = await PaymentService.processPayment(bookingId, amount, paymentMethod);
      setFeedback({
        message: `Payment successful! Transaction ID: ${response.transactionId}`,
        type: 'success',
      });
      setTimeout(() => navigate('/my-bookings'), 2000);
    } catch (err) {
      let errorMessage = 'Payment failed. An unexpected error occurred.';
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
    } finally {
      setLoading(false);
    }
  };

  if (!bookingId || !amount) {
    return (
      <Container style={{ marginTop: '2em', marginBottom: '2em' }}>
        <Message negative>
          <Message.Header>Missing Booking Details</Message.Header>
          <p>{feedback.message}</p>
          <Button
            primary
            as={Link}
            to="/make-booking"
            style={{ backgroundColor: '#214EFF', borderRadius: '5px' }}
          >
            Go to Make Booking
          </Button>
        </Message>
      </Container>
    );
  }

  return (
    <Segment
      inverted
      style={{
        minHeight: 'calc(100vh - 150px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F4F7F6',
      }}
    >
      <Segment
        style={{
          padding: '3em',
          width: '500px',
          borderRadius: '10px',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'white',
        }}
      >
        <SUIHeader as="h2" textAlign="center" style={{ color: '#333' }}>
          <Icon name="credit card outline" /> Complete Your Payment
        </SUIHeader>
        <Divider />

        <Message info size="large">
          <Message.Header>Booking Details</Message.Header>
          <p>
            Booking ID: <strong>{bookingId}</strong>
          </p>
          <p>
            Amount Due: <strong>₹{amount}</strong>
          </p>
        </Message>

        <Form
          onSubmit={handleSubmit}
          loading={loading}
          success={feedback.type === 'success'}
          error={feedback.type === 'error'}
        >
          <Form.Field required>
            <label>Payment Method</label>
            <Select
              placeholder="Select Payment Method"
              options={paymentMethodOptions}
              value={paymentMethod}
              onChange={(e, { value }) => setPaymentMethod(value)}
            />
          </Form.Field>

          {paymentMethod && paymentMethod !== 'UPI' && (
            <>
              <Form.Field required>
                <label>Card Number</label>
                <Input icon="credit card" iconPosition="left" placeholder="**** **** **** ****" />
              </Form.Field>
              <Form.Group widths="equal">
                <Form.Field required>
                  <label>Expiry Date</label>
                  <Input placeholder="MM/YY" />
                </Form.Field>
                <Form.Field required>
                  <label>CVV</label>
                  <Input placeholder="***" type="password" />
                </Form.Field>
              </Form.Group>
            </>
          )}

          {paymentMethod === 'UPI' && (
            <Form.Field required>
              <label>UPI ID</label>
              <Input icon="mobile alternate" iconPosition="left" placeholder="yourname@upi" />
            </Form.Field>
          )}

          {feedback.message && (
            feedback.type === 'success' ? (
              <Message success header="Success" content={feedback.message} />
            ) : (
              <Message error header="Error" content={feedback.message} />
            )
          )}

          <Button
            primary
            fluid
            size="large"
            type="submit"
            loading={loading}
            disabled={loading || !paymentMethod}
            style={{ backgroundColor: '#214EFF', borderRadius: '5px', marginTop: '2em' }}
          >
            Pay Now
          </Button>
        </Form>
      </Segment>
    </Segment>
  );
};

export default PaymentPage;
