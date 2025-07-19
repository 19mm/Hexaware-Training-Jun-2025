import React, { useState, useEffect } from 'react';
import {
  Container,
  Header as SUIHeader,
  Grid,
  Card,
  Image,
  Icon,
  Dimmer,
  Loader,
  Message,
  Button,
} from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import CarService from '../../services/CarService'; 

const BrowseCarsPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchCars = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await CarService.getAllCars();
      setCars(data);
    } catch (err) {
      console.error('Error fetching cars:', err);
      let errorMessage = 'Failed to load cars. Please try again later.';
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []); 

  const handleViewDetails = (carId) => {
    navigate(`/cars/${carId}`);
  };

  return (
    <Container style={{ marginTop: '4em', marginBottom: '4em' }}>
      <SUIHeader as="h2" textAlign="center" style={{ color: '#333' }}>
        Available Cars
        <SUIHeader.Subheader>
          Explore our wide range of vehicles available for rent
        </SUIHeader.Subheader>
      </SUIHeader>

      {loading && (
        <Dimmer active inverted>
          <Loader inverted>Loading Cars...</Loader>
        </Dimmer>
      )}

      {error && (
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{error}</p>
        </Message>
      )}

      {!loading && cars.length === 0 && !error && (
        <Message info>
          <Message.Header>No Cars Found</Message.Header>
          <p>There are currently no cars available. Please check back later!</p>
        </Message>
      )}

      <Grid stackable columns={3} style={{ marginTop: '2em' }}>
        {cars.map((car) => (
          <Grid.Column key={car.id}>
            <Card
              fluid
              style={{
                borderRadius: '10px',
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Image
                src={car.imageUrl || 'https://placehold.co/600x400/E0E0E0/ffffff?text=Car+Image'}
                wrapped
                ui={false}
                style={{
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                  height: '200px', 
                  objectFit: 'cover',
                }}
              />
              <Card.Content>
                <Card.Header>{car.make} {car.model}</Card.Header>
                <Card.Meta>{car.type} ({car.year})</Card.Meta>
                <Card.Description>
                  <Grid columns={2} relaxed>
                    <Grid.Column>
                      <Icon name="users" /> {car.seatingCapacity} Seats
                    </Grid.Column>
                    <Grid.Column>
                      <Icon name="gas pump" /> {car.fuelType}
                    </Grid.Column>
                    <Grid.Column>
                      <Icon name="cogs" /> {car.transmissionType}
                    </Grid.Column>
                  </Grid>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#214EFF' }}>
                    ₹{car.dailyRate} /day
                  </span>
                  <Button
                    primary
                    onClick={() => handleViewDetails(car.id)}
                    style={{ backgroundColor: '#214EFF', borderRadius: '5px' }}
                  >
                    <Icon name="eye" /> View Details
                  </Button>
                </div>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid>
    </Container>
  );
};

export default BrowseCarsPage;
