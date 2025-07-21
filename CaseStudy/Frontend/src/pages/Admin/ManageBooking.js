import React, { useEffect, useState, useRef } from 'react'; 
import { Container, Header as SUIHeader, Segment, Dimmer, Loader, Message, Card, Icon, Button, Divider, Table } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import BookingService from '../../services/BookingService';
import CarService from '../../services/CarService';
import AuthService from '../../services/AuthService';

const ManageBookingsPage = () => {
  const navigate = useNavigate();
  const currentUser = useRef(AuthService.getCurrentUser()).current;

  const [bookings, setBookings] = useState([]);
  const [carDetailsMap, setCarDetailsMap] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updateStatusLoading, setUpdateStatusLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [actionFeedback, setActionFeedback] = useState({ message: '', type: '' });

  useEffect(() => {
    let isMounted = true; 

    if (!currentUser || !currentUser.userId) {
      if (isMounted) { 
        navigate('/login');
      }
      return;
    }
    if (!currentUser.roles || !currentUser.roles.includes('ADMIN')) {
      if (isMounted) { 
        setError('You do not have administrative privileges to view this page.');
        setLoading(false); 
      }
      return;
    }

    const fetchAllBookings = async () => {
      if (!isMounted) return; 

      setLoading(true); 
      setError('');
      try {
        const allBookings = await BookingService.getAllBookings();

        if (isMounted) {
          setBookings(allBookings);

          if (allBookings.length > 0) {
            const uniqueCarIds = [...new Set(allBookings.map(b => b.carId))];
            const carDetailsPromises = uniqueCarIds.map(id => CarService.getCarById(id));
            const cars = await Promise.all(carDetailsPromises);
            const detailsMap = new Map();
            cars.forEach(car => detailsMap.set(car.id, car));
            setCarDetailsMap(detailsMap);
          } else {
            setCarDetailsMap(new Map()); 
          }
        }
      } catch (err) {
        if (isMounted) { 
          console.error("Error fetching all bookings:", err);
          setError(`Failed to load all bookings: ${err.response?.data?.message || err.message}`);
        }
      } finally {
        if (isMounted) { 
          setLoading(false);
        }
      }
    };

    fetchAllBookings();

    return () => {
      isMounted = false;
    };
  }, []); 

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    return new Date(dateTimeString).toLocaleString();
  };

  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    setUpdateStatusLoading(true);
    setActionFeedback({ message: '', type: '' });
    try {
      const updatedBooking = await BookingService.updateBookingStatus(bookingId, newStatus);
      setBookings(prevBookings =>
        prevBookings.map(b => (b.id === bookingId ? updatedBooking : b))
      );
      setActionFeedback({ type: 'success', message: `Booking ${bookingId} status updated to ${newStatus}.` });
    } catch (err) {
      console.error("Error updating booking status:", err);
      setActionFeedback({ type: 'error', message: `Failed to update status for booking ${bookingId}: ${err.response?.data?.message || err.message}` });
    } finally {
      setUpdateStatusLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    setCancelLoading(true);
    setActionFeedback({ message: '', type: '' });
    try {
      await BookingService.cancelBooking(bookingId);
      setBookings(prevBookings =>
        prevBookings.map(b => (b.id === bookingId ? { ...b, status: 'CANCELLED' } : b))
      );
      setActionFeedback({ type: 'success', message: `Booking ${bookingId} cancelled successfully.` });
    } catch (err) {
      console.error("Error canceling booking:", err);
      setActionFeedback({ type: 'error', message: `Failed to cancel booking ${bookingId}: ${err.response?.data?.message || err.message}` });
    } finally {
      setCancelLoading(false);
    }
  };

  if (loading) {
    return (
      <Segment style={{ minHeight: 'calc(100vh - 150px)', display: 'flex' }}>
        <Dimmer active inverted><Loader inverted>Loading All Bookings...</Loader></Dimmer>
      </Segment>
    );
  }

  if (error) {
    return (
      <Container style={{ marginTop: '2em', marginBottom: '2em' }}>
        <Message negative header='Error' content={error} />
      </Container>
    );
  }

  if (!currentUser || !currentUser.roles || !currentUser.roles.includes('ADMIN')) {
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
      <SUIHeader as='h1' textAlign='center' icon>
        <Icon name='book' /> All Bookings Oversight
        <SUIHeader.Subheader>Manage and monitor all car rental bookings in the system.</SUIHeader.Subheader>
      </SUIHeader>
      <Divider />

      {actionFeedback.message && (
        <Message positive={actionFeedback.type === 'success'} negative={actionFeedback.type === 'error'} header={actionFeedback.type === 'success' ? 'Success' : 'Error'} content={actionFeedback.message} />
      )}

      {bookings.length === 0 ? (
        <Message info icon='info circle' header='No Bookings Found' content='There are no bookings in the system.' />
      ) : (
        <Table celled padded selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>User ID</Table.HeaderCell>
              <Table.HeaderCell>Car (ID)</Table.HeaderCell>
              <Table.HeaderCell>Pickup Time</Table.HeaderCell>
              <Table.HeaderCell>Drop-off Time</Table.HeaderCell>
              <Table.HeaderCell>Total Amount</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Optional Extras</Table.HeaderCell>
              <Table.HeaderCell>Booking Date</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {bookings.map((booking) => {
              const car = carDetailsMap.get(booking.carId);
              return (
                <Table.Row key={booking.id}>
                  <Table.Cell>{booking.id}</Table.Cell>
                  <Table.Cell>{booking.userId}</Table.Cell>
                  <Table.Cell>{car ? `${car.make} ${car.model} (${booking.carId})` : `ID: ${booking.carId}`}</Table.Cell>
                  <Table.Cell>{formatDateTime(booking.pickupDateTime)}</Table.Cell>
                  <Table.Cell>{formatDateTime(booking.dropoffDateTime)}</Table.Cell>
                  <Table.Cell>₹{booking.totalAmount}</Table.Cell>
                  <Table.Cell>
                    <Message size='mini'
                      positive={booking.status === 'CONFIRMED'}
                      warning={booking.status === 'PENDING'}
                      negative={booking.status === 'CANCELLED' || booking.status === 'REJECTED'}
                      info={booking.status === 'COMPLETED'}
                      content={booking.status}
                    />
                  </Table.Cell>
                  <Table.Cell>{booking.optionalExtras || 'N/A'}</Table.Cell>
                  <Table.Cell>{formatDateTime(booking.bookingDate)}</Table.Cell>
                  <Table.Cell>
                    <Button.Group vertical>
                      {booking.status === 'PENDING' && (
                        <Button color='green' size='mini' onClick={() => handleUpdateBookingStatus(booking.id, 'CONFIRMED')} loading={updateStatusLoading}>Confirm</Button>
                      )}
                      {(booking.status === 'PENDING' || booking.status === 'CONFIRMED') && (
                        <Button color='red' size='mini' onClick={() => handleUpdateBookingStatus(booking.id, 'REJECTED')} loading={updateStatusLoading}>Reject</Button>
                      )}
                      {(booking.status !== 'CANCELLED' && booking.status !== 'COMPLETED') && (
                        <Button negative size='mini' onClick={() => handleCancelBooking(booking.id)} loading={cancelLoading}>Cancel</Button>
                      )}
                       {booking.status === 'CONFIRMED' && (
                        <Button color='blue' size='mini' onClick={() => handleUpdateBookingStatus(booking.id, 'COMPLETED')} loading={updateStatusLoading}>Complete</Button>
                      )}
                    </Button.Group>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      )}
    </Container>
  );
};

export default ManageBookingsPage;