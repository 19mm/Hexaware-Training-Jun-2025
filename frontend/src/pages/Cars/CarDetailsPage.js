import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Header as SUIHeader, Image, Segment, Dimmer, Loader, Message, Grid, Icon, Button, Divider, Comment, Rating } from 'semantic-ui-react'; 
import CarService from '../../services/CarService';
import ReviewService from '../../services/ReviewService'; 
import ReviewForm from '../../components/common/ReviewForm'; 

const CarDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [reviews, setReviews] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState('');

  useEffect(() => {
    const fetchCarDetails = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await CarService.getCarById(id);
        setCar(data);
      } catch (err) {
        console.error("Error fetching car details:", err);
        setError('Failed to load car details. The car might not exist or there was a server error.');
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCarDetails();
    } else {
      setError('No car ID provided.');
      setLoading(false);
    }
  }, [id]);

  const fetchReviews = async () => {
    setReviewsLoading(true);
    setReviewsError('');
    try {
      const data = await ReviewService.getReviewsByCarId(id);
      setReviews(data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setReviewsError('Failed to load reviews.');
      if (err.response && err.response.data && err.response.data.message) {
        setReviewsError(err.response.data.message);
      }
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchReviews();
    }
  }, [id]);

  const handleBookNow = () => {
    navigate(`/make-booking`, { state: { carId: car.id, carDetails: car } });
  };

  const formatReviewDate = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    const date = new Date(dateTimeString);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <Segment style={{ minHeight: 'calc(100vh - 150px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Dimmer active inverted>
          <Loader inverted>Loading Car Details...</Loader>
        </Dimmer>
      </Segment>
    );
  }

  if (error) {
    return (
      <Container style={{ marginTop: '2em', marginBottom: '2em' }}>
        <Message negative>
          <Message.Header>Error Loading Car</Message.Header>
          <p>{error}</p>
          <Button primary onClick={() => navigate('/')} style={{ backgroundColor: '#214EFF', borderRadius: '5px' }}>Back to Car Listing</Button>
        </Message>
      </Container>
    );
  }

  if (!car) {
    return (
      <Container style={{ marginTop: '2em', marginBottom: '2em' }}>
        <Message info>
          <Message.Header>Car Not Found</Message.Header>
          <p>No car details found for the given ID.</p>
          <Button primary onClick={() => navigate('/')} style={{ backgroundColor: '#214EFF', borderRadius: '5px' }}>Back to Car Listing</Button>
        </Message>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: '2em', marginBottom: '2em' }}>
      <Segment style={{ padding: '3em', borderRadius: '10px', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
        <Grid stackable columns={2}>
          <Grid.Column width={8}>
            <Image src={car.imageUrl || 'https://placehold.co/800x600/E0E0E0/ffffff?text=Car+Image'} fluid style={{ borderRadius: '8px', boxShadow: '0px 2px 8px rgba(0,0,0,0.1)' }} />
          </Grid.Column>
          <Grid.Column width={8}>
            <SUIHeader as='h2' style={{ color: '#333', marginBottom: '0.5em' }}>
              {car.make} {car.model} ({car.year})
              <SUIHeader.Subheader>{car.type}</SUIHeader.Subheader>
            </SUIHeader>

            <Divider />

            <Grid columns={2} relaxed='very'>
              <Grid.Column>
                <SUIHeader as='h4'><Icon name='users' color='blue' /> Seating Capacity</SUIHeader>
                <p>{car.seatingCapacity} Seats</p>
              </Grid.Column>
              <Grid.Column>
                <SUIHeader as='h4'><Icon name='gas pump' color='blue' /> Fuel Type</SUIHeader>
                <p>{car.fuelType}</p>
              </Grid.Column>
              <Grid.Column>
                <SUIHeader as='h4'><Icon name='cogs' color='blue' /> Transmission</SUIHeader>
                <p>{car.transmissionType}</p>
              </Grid.Column>
              <Grid.Column>
                <SUIHeader as='h4'><Icon name='map marker alternate' color='blue' /> Location</SUIHeader>
                <p>{car.currentLocation}</p>
              </Grid.Column>
              <Grid.Column>
                <SUIHeader as='h4'><Icon name='tag' color='blue' /> License Plate</SUIHeader>
                <p>{car.licensePlate}</p>
              </Grid.Column>
              <Grid.Column>
                <SUIHeader as='h4'><Icon name='check circle' color='blue' /> Availability</SUIHeader>
                <p>{car.availabilityStatus ? 'Available' : 'Currently Unavailable'}</p>
              </Grid.Column>
            </Grid>

            <Divider />

            <SUIHeader as='h3' style={{ color: '#214EFF', marginTop: '1em' }}>
              Daily Rate: ₹{car.dailyRate}
            </SUIHeader>

            <p style={{ fontSize: '1.1em', lineHeight: '1.6', color: '#555' }}>
              {car.description || 'No description available for this car.'}
            </p>

            <Button
              primary
              fluid
              size='large'
              style={{ backgroundColor: '#214EFF', borderRadius: '5px', marginTop: '2em' }}
              onClick={handleBookNow}
              disabled={!car.availabilityStatus}
            >
              <Icon name='calendar check outline' /> {car.availabilityStatus ? 'Book Now' : 'Not Available for Booking'}
            </Button>
          </Grid.Column>
        </Grid>

        <Divider horizontal style={{ margin: '4em 0 2em 0' }}>Reviews</Divider>

        <Segment style={{ padding: '2em', borderRadius: '10px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)', marginBottom: '3em' }}>
          <ReviewForm carId={id} onReviewSubmitted={fetchReviews} /> {/* Pass carId and callback */}
        </Segment>

        {reviewsLoading && (
          <Dimmer active inverted>
            <Loader inverted>Loading Reviews...</Loader>
          </Dimmer>
        )}

        {reviewsError && (
          <Message negative>
            <Message.Header>Error Loading Reviews</Message.Header>
            <p>{reviewsError}</p>
          </Message>
        )}

        {!reviewsLoading && reviews.length === 0 && !reviewsError ? (
          <Message info>
            <Message.Header>No Reviews Yet</Message.Header>
            <p>Be the first to review this car!</p>
          </Message>
        ) : (
          <Comment.Group style={{ maxWidth: '100%' }}>
            {reviews.map(review => (
              <Comment key={review.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '1.5em', marginBottom: '1.5em' }}>
                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' /> 
                <Comment.Content>
                  <Comment.Author as='a'>{`User ${review.userId}`}</Comment.Author> 
                  <Comment.Metadata>
                    <div>{formatReviewDate(review.reviewDate)}</div>
                    <Rating icon='star' defaultRating={review.rating} maxRating={5} disabled size='small' />
                  </Comment.Metadata>
                  <Comment.Text>{review.comment}</Comment.Text>
                </Comment.Content>
              </Comment>
            ))}
          </Comment.Group>
        )}
      </Segment>
    </Container>
  );
};

export default CarDetailsPage;