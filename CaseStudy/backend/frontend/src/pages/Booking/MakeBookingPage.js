import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Message, Segment, Header as SUIHeader, Icon, Divider, Grid, Loader } from 'semantic-ui-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import BookingService from '../../services/BookingService';
import AuthService from '../../services/AuthService';
import CarService from '../../services/CarService';

const MakeBookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = AuthService.getCurrentUser();

  const [carId, setCarId] = useState('');
  const [carDetails, setCarDetails] = useState(null);
  const [pickupDateTime, setPickupDateTime] = useState('');
  const [dropoffDateTime, setDropoffDateTime] = useState('');
  const [optionalExtras, setOptionalExtras] = useState('');
  const [totalAmount, setTotalAmount] = useState('0.00');

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [carLoading, setCarLoading] = useState(false);
  const [carError, setCarError] = useState('');

  useEffect(() => {
    if (location.state && location.state.carId && location.state.carDetails) {
      setCarId(location.state.carId);
      setCarDetails(location.state.carDetails);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchCar = async () => {
      if (carId) {
        setCarLoading(true);
        setCarError('');
        try {
          const data = await CarService.getCarById(carId);
          setCarDetails(data);
          setCarError('');
        } catch (err) {
          console.error("Error fetching car for booking:", err);
          setCarDetails(null);
          setCarError('Could not find car with this ID. Please enter a valid Car ID.');
        } finally {
          setCarLoading(false);
        }
      } else {
        setCarDetails(null);
        setCarError('');
      }
    };
    fetchCar();
  }, [carId]);

  useEffect(() => {
    if (carDetails && pickupDateTime && dropoffDateTime) {
      try {
        const pickupDate = new Date(pickupDateTime);
        const dropoffDate = new Date(dropoffDateTime);

        if (pickupDate >= dropoffDate) {
          setTotalAmount('0.00');
          return;
        }

        const diffTime = Math.abs(dropoffDate - pickupDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (carDetails.dailyRate) {
          const calculatedAmount = carDetails.dailyRate * diffDays;
          setTotalAmount(calculatedAmount.toFixed(2));
        } else {
          setTotalAmount('0.00');
        }
      } catch (e) {
        setTotalAmount('0.00');
        console.error("Error calculating total amount:", e);
      }
    } else {
      setTotalAmount('0.00');
    }
  }, [carDetails, pickupDateTime, dropoffDateTime]);


  const handleSubmit = async () => {
    setLoading(true);
    setFeedback({ message: '', type: '' });

    if (!currentUser) {
      setFeedback({ message: 'You must be logged in to make a booking.', type: 'error' });
      setLoading(false);
      return;
    }
    if (!carDetails || !carDetails.id) {
      setFeedback({ message: 'Please select a valid car.', type: 'error' });
      setLoading(false);
      return;
    }
    if (!pickupDateTime || !dropoffDateTime) {
      setFeedback({ message: 'Please select both pickup and drop-off dates/times.', type: 'error' });
      setLoading(false);
      return;
    }

    const pickupDateObj = new Date(pickupDateTime);
    const dropoffDateObj = new Date(dropoffDateTime);
    const now = new Date();

    if (pickupDateObj >= dropoffDateObj) {
      setFeedback({ message: 'Pickup date/time must be before drop-off date/time.', type: 'error' });
      setLoading(false);
      return;
    }
    if (pickupDateObj < now) {
      setFeedback({ message: 'Pickup date/time cannot be in the past.', type: 'error' });
      setLoading(false);
      return;
    }

    const formatDateTime = (dateString) => {
      return `${dateString}:00`;
    };

    try {
      const response = await BookingService.makeBooking(
        carDetails.id,
        formatDateTime(pickupDateTime),
        formatDateTime(dropoffDateTime),
        optionalExtras
      );

      setFeedback({ message: `Booking successful! Proceeding to payment...`, type: 'success' });
      setTimeout(() => {
        navigate('/payment', {
          state: {
            bookingId: response.id,
            totalAmount: response.totalAmount, 
            carDetails: carDetails 
          }
        });
      }, 1500); 
    } catch (err) {
      setLoading(false);
      let errorMessage = 'Booking failed. An unexpected error occurred.';

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
      console.error("Booking error:", err);
    }
  };

  return (
    <Segment inverted style={{ minHeight: 'calc(100vh - 150px)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4F7F6' }}>
      <Segment style={{ padding: '3em', width: '600px', borderRadius: '10px', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
        <SUIHeader as='h2' textAlign='center' style={{ color: '#333' }}>
          <Icon name='calendar check outline' /> Make a New Booking
        </SUIHeader>
        <Divider />

        {!currentUser && (
          <Message warning>
            <Message.Header>Login Required</Message.Header>
            <p>You must be logged in to make a booking. Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link>.</p>
          </Message>
        )}

        <Form onSubmit={handleSubmit} loading={loading || carLoading} success={feedback.type === 'success'} error={feedback.type === 'error'}>
          <Form.Field>
            <label>Car ID</label>
            <Input
              icon='car'
              iconPosition='left'
              placeholder='Enter Car ID (e.g., 1)'
              type='number'
              name='carId'
              value={carId}
              onChange={(e) => setCarId(e.target.value)}
              required
              disabled={loading || carLoading || (location.state && location.state.carId)}
            />
            {carLoading && <Loader active inline size='small' />}
            {carError && <Message negative size='mini' content={carError} />}
            {carDetails && !carError && (
              <Message positive size='mini' style={{ marginTop: '0.5em' }}>
                <Message.Header>Car Selected:</Message.Header>
                <p>{carDetails.make} {carDetails.model} ({carDetails.year}) - Daily Rate: ₹{carDetails.dailyRate}</p>
                <p>Availability: {carDetails.availabilityStatus ? 'Available' : 'Unavailable'}</p>
              </Message>
            )}
          </Form.Field>

          {carDetails && carDetails.availabilityStatus && (
            <>
              <Form.Group widths='equal'>
                <Form.Field>
                  <label>Pickup Date & Time</label>
                  <Input
                    type='datetime-local'
                    name='pickupDateTime'
                    value={pickupDateTime}
                    onChange={(e) => setPickupDateTime(e.target.value)}
                    required
                  />
                </Form.Field>
                <Form.Field>
                  <label>Drop-off Date & Time</label>
                  <Input
                    type='datetime-local'
                    name='dropoffDateTime'
                    value={dropoffDateTime}
                    onChange={(e) => setDropoffDateTime(e.target.value)}
                    required
                  />
                </Form.Field>
              </Form.Group>

              <Form.Field>
                <label>Optional Extras (e.g., Child Seat, GPS)</label>
                <Input
                  icon='plus circle'
                  iconPosition='left'
                  placeholder='Any special requests or extras?'
                  name='optionalExtras'
                  value={optionalExtras}
                  onChange={(e) => setOptionalExtras(e.target.value)}
                />
              </Form.Field>

              <Divider horizontal>Booking Summary</Divider>

              <Grid columns={2} stackable>
                <Grid.Column>
                  <SUIHeader as='h4'>Car: {carDetails.make} {carDetails.model}</SUIHeader>
                  <p>Daily Rate: ₹{carDetails.dailyRate}</p>
                </Grid.Column>
                <Grid.Column textAlign='right'>
                  <SUIHeader as='h3' style={{ color: '#214EFF' }}>Total Amount: ₹{totalAmount}</SUIHeader>
                </Grid.Column>
              </Grid>

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
                size='large'
                type='submit'
                loading={loading}
                disabled={loading || !currentUser || !carDetails.availabilityStatus || parseFloat(totalAmount) <= 0}
                style={{ backgroundColor: '#214EFF', borderRadius: '5px', marginTop: '2em' }}
              >
                Confirm Booking
              </Button>
            </>
          )}
          {carDetails && !carDetails.availabilityStatus && (
            <Message warning>
              <Message.Header>Car Unavailable</Message.Header>
              <p>This car is currently not available for booking. Please select another car.</p>
            </Message>
          )}
        </Form>
      </Segment>
    </Segment>
  );
};

export default MakeBookingPage;