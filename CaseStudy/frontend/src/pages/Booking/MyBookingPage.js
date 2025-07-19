import React, { useState, useEffect } from 'react';
import { Container, Header as SUIHeader, Segment, Dimmer, Loader, Message, Card, Icon, Button, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import BookingService from '../../services/BookingService';
import CarService from '../../services/CarService';
import AuthService from '../../services/AuthService';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [carDetailsMap, setCarDetailsMap] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelState, setCancelState] = useState({ loading: false, bookingId: null, feedback: null });

  const userId = AuthService.getCurrentUser()?.userId; 

  useEffect(() => {
    const fetchAllData = async () => {
      if (!userId) { 
        setError('You must be logged in to view your bookings.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');
      try {
        const bookingsData = await BookingService.getMyBookings();
        setBookings(bookingsData);

        if (bookingsData.length > 0) {
          const uniqueCarIds = [...new Set(bookingsData.map(b => b.carId))];
          const carDetailsPromises = uniqueCarIds.map(id => CarService.getCarById(id));
          const cars = await Promise.all(carDetailsPromises);
          const detailsMap = new Map();
          cars.forEach(car => detailsMap.set(car.id, car));
          setCarDetailsMap(detailsMap);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError('Failed to load your bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [userId]); 

  const handleCancelBooking = async (bookingId) => {
    setCancelState({ loading: true, bookingId: bookingId, feedback: null });
    try {
      await BookingService.cancelBooking(bookingId);
      setCancelState({ loading: false, bookingId: null, feedback: { type: 'success', message: 'Booking cancelled successfully!' }});
      setBookings(currentBookings =>
        currentBookings.map(b => b.id === bookingId ? { ...b, status: 'CANCELLED' } : b)
      );
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to cancel booking.';
      setCancelState({ loading: false, bookingId: null, feedback: { type: 'error', message: errorMessage }});
    }
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    return new Date(dateTimeString).toLocaleString();
  };

  if (loading) {
    return (
      <Segment style={{ minHeight: 'calc(100vh - 150px)', display: 'flex' }}>
        <Dimmer active inverted><Loader inverted>Loading Your Bookings...</Loader></Dimmer>
      </Segment>
    );
  }

  if (error) {
    return (
      <Container style={{ marginTop: '2em' }}>
        <Message negative header='Error' content={error} />
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: '2em', marginBottom: '2em' }}>
      <SUIHeader as='h1' textAlign='center' icon>
        My Bookings
        <SUIHeader.Subheader>Review your past and upcoming reservations.</SUIHeader.Subheader>
      </SUIHeader>

      {cancelState.feedback && (
        <Message positive={cancelState.feedback.type === 'success'} negative={cancelState.feedback.type === 'error'}>
          <p>{cancelState.feedback.message}</p>
        </Message>
      )}

      {bookings.length === 0 ? (
        <Message info icon='info circle' header='No Bookings Found' content='You have no bookings yet. Find a car to rent!' />
      ) : (
        <Card.Group itemsPerRow={3} stackable>
          {bookings.map((booking) => {
            const car = carDetailsMap.get(booking.carId);

            return (
              <Card key={booking.id} fluid raised>
                <Card.Content>
                  <Card.Header>{car ? `${car.make} ${car.model}` : 'Car Details...'}</Card.Header>
                  <Card.Meta>
                    <span style={{ color: booking.status === 'CONFIRMED' ? 'green' : booking.status === 'CANCELLED' ? 'red' : 'orange', fontWeight: 'bold' }}>
                      Status: {booking.status}
                    </span>
                  </Card.Meta>

                  <Card.Description style={{ marginTop: '1em' }}>
                    <p><Icon name='book' /> Booking ID: {booking.id}</p>
                    <p><Icon name='car' /> Car ID: {booking.carId}</p>
                    <p><Icon name='calendar alternate outline' /> Pickup: {formatDateTime(booking.pickupDateTime)}</p>
                    <p><Icon name='calendar check outline' /> Drop-off: {formatDateTime(booking.dropoffDateTime)}</p>
                    <p><Icon name='money bill alternate outline' /> Total Amount: ₹{booking.totalAmount}</p>
                  </Card.Description>
                </Card.Content>

                <Card.Content extra>
                  {(booking.status === 'PENDING' || booking.status === 'CONFIRMED') && new Date(booking.pickupDateTime) > new Date() ? (
                    <Button negative fluid onClick={() => handleCancelBooking(booking.id)} loading={cancelState.loading && cancelState.bookingId === booking.id} disabled={cancelState.loading}>
                      <Icon name='cancel' /> Cancel Booking
                    </Button>
                  ) : (
                    <Button fluid disabled>
                      <Icon name='info circle' /> {booking.status === 'CANCELLED' ? 'Booking Cancelled' : 'Cannot Cancel'}
                    </Button>
                  )}
                </Card.Content>
              </Card>
            );
          })}
        </Card.Group>
      )}
    </Container>
  );
};

export default MyBookingsPage;