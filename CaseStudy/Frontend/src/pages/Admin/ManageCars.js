import React, { useState, useEffect } from 'react';
import { Container, Header as SUIHeader, Segment, Dimmer, Loader, Message, Table, Icon, Button, Form, Input, Checkbox, Divider, Modal } from 'semantic-ui-react'; 
import { useNavigate, Link } from 'react-router-dom';
import CarService from '../../services/CarService';
import AuthService from '../../services/AuthService';

const ManageCars = () => {
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formFeedback, setFormFeedback] = useState({ message: '', type: '' });

  const [currentCar, setCurrentCar] = useState(null); 
  const [modalOpen, setModalOpen] = useState(false); 
  const [isEditMode, setIsEditMode] = useState(false); 

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    type: '',
    year: '',
    description: '',
    imageUrl: '',
    dailyRate: '',
    availabilityStatus: true,
    currentLocation: '',
    licensePlate: '',
    seatingCapacity: '',
    transmissionType: '',
    fuelType: '',
  });

  useEffect(() => {
    if (!currentUser || !currentUser.userId || !currentUser.roles.includes('ADMIN')) {
      navigate('/login'); 
      return;
    }
  }, [currentUser, navigate]);

  const fetchCars = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await CarService.getAllCars();
      setCars(data);
    } catch (err) {
      console.error("Error fetching cars for admin:", err);
      setError('Failed to load cars. Please ensure you are logged in as an Admin.');
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []); 
  
  const handleChange = (e, { name, value, checked, type }) => {
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAddCarClick = () => {
    setIsEditMode(false);
    setCurrentCar(null);
    setFormData({ 
      make: '', model: '', type: '', year: '', description: '', imageUrl: '',
      dailyRate: '', availabilityStatus: true, currentLocation: '', licensePlate: '',
      seatingCapacity: '', transmissionType: '', fuelType: '',
    });
    setFormFeedback({ message: '', type: '' });
    setModalOpen(true);
  };

  const handleEditCarClick = (car) => {
    setIsEditMode(true);
    setCurrentCar(car);
    setFormData({
      make: car.make, model: car.model, type: car.type, year: car.year, description: car.description,
      imageUrl: car.imageUrl, dailyRate: car.dailyRate, availabilityStatus: car.availabilityStatus,
      currentLocation: car.currentLocation, licensePlate: car.licensePlate,
      seatingCapacity: car.seatingCapacity, transmissionType: car.transmissionType, fuelType: car.fuelType,
    });
    setFormFeedback({ message: '', type: '' });
    setModalOpen(true);
  };

  const handleFormSubmit = async () => {
    setFormLoading(true);
    setFormFeedback({ message: '', type: '' });

    const carDataToSend = {
      ...formData,
      year: parseInt(formData.year, 10), 
      dailyRate: parseFloat(formData.dailyRate), 
      seatingCapacity: parseInt(formData.seatingCapacity, 10), 
    };

    try {
      if (isEditMode && currentCar) {
        await CarService.updateCar(currentCar.id, carDataToSend);
        setFormFeedback({ message: 'Car updated successfully!', type: 'success' });
      } else {
        await CarService.addCar(carDataToSend);
        setFormFeedback({ message: 'Car added successfully!', type: 'success' });
      }
      fetchCars(); 
      setTimeout(() => setModalOpen(false), 1500); 
    } catch (err) {
      setFormLoading(false);
      let errorMessage = isEditMode ? 'Failed to update car.' : 'Failed to add car.';
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
      console.error("Car form submission error:", err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteCar = async (carId) => {
    if (window.confirm('Are you sure you want to delete this car? This action cannot be undone.')) {
      setLoading(true); 
      setError('');
      try {
        await CarService.deleteCar(carId);
        setFormFeedback({ message: 'Car deleted successfully!', type: 'success' });
        fetchCars(); 
      } catch (err) {
        setLoading(false);
        let errorMessage = 'Failed to delete car.';
        if (err.response && err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        } else if (err.message) {
          errorMessage = err.message;
        }
        setError(errorMessage);
        console.error("Delete car error:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading && !error && cars.length === 0) {
    return (
      <Segment style={{ minHeight: 'calc(100vh - 150px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Dimmer active inverted>
          <Loader inverted>Loading Cars...</Loader>
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
            <p>Please <Link to="/login">login as an administrator</Link> to manage cars.</p>
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
        <Icon name='car' /> Manage Car Listings
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

      <Button primary onClick={handleAddCarClick} style={{ backgroundColor: '#214EFF', borderRadius: '5px', marginBottom: '1em' }}>
        <Icon name='plus' /> Add New Car
      </Button>

      <Modal
        onClose={() => setModalOpen(false)}
        onOpen={() => setModalOpen(true)}
        open={modalOpen}
        size='small'
        closeIcon
      >
        <Modal.Header>{isEditMode ? 'Edit Car Details' : 'Add New Car'}</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleFormSubmit} loading={formLoading} success={formFeedback.type === 'success'} error={formFeedback.type === 'error'}>
            <Form.Group widths='equal'>
              <Form.Field required>
                <label>Make</label>
                <Input name='make' value={formData.make} onChange={handleChange} placeholder='Toyota' />
              </Form.Field>
              <Form.Field required>
                <label>Model</label>
                <Input name='model' value={formData.model} onChange={handleChange} placeholder='Camry' />
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field required>
                <label>Type</label>
                <Input name='type' value={formData.type} onChange={handleChange} placeholder='Sedan, SUV, Hatchback' />
              </Form.Field>
              <Form.Field required>
                <label>Year</label>
                <Input name='year' type='number' value={formData.year} onChange={handleChange} placeholder='2023' />
              </Form.Field>
            </Form.Group>
            <Form.Field required>
              <label>License Plate</label>
              <Input name='licensePlate' value={formData.licensePlate} onChange={handleChange} placeholder='ABC1234' disabled={isEditMode} /> 
            </Form.Field>
            <Form.Field required>
              <label>Daily Rate (₹)</label>
              <Input name='dailyRate' type='number' step='0.01' value={formData.dailyRate} onChange={handleChange} placeholder='55.00' />
            </Form.Field>
            <Form.Field required>
              <label>Current Location</label>
              <Input name='currentLocation' value={formData.currentLocation} onChange={handleChange} placeholder='Downtown Office' />
            </Form.Field>
            <Form.Group widths='equal'>
              <Form.Field required>
                <label>Seating Capacity</label>
                <Input name='seatingCapacity' type='number' value={formData.seatingCapacity} onChange={handleChange} placeholder='5' />
              </Form.Field>
              <Form.Field required>
                <label>Transmission Type</label>
                <Input name='transmissionType' value={formData.transmissionType} onChange={handleChange} placeholder='Automatic, Manual' />
              </Form.Field>
              <Form.Field required>
                <label>Fuel Type</label>
                <Input name='fuelType' value={formData.fuelType} onChange={handleChange} placeholder='Petrol, Diesel, Electric' />
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <label>Image URL</label>
              <Input name='imageUrl' value={formData.imageUrl} onChange={handleChange} placeholder='https://example.com/car.jpg' />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <Form.TextArea name='description' value={formData.description} onChange={handleChange} placeholder='Brief description of the car...' />
            </Form.Field>
            <Form.Field>
              <Checkbox
                label='Available for Rent'
                name='availabilityStatus'
                checked={formData.availabilityStatus}
                onChange={handleChange}
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
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button
            primary
            onClick={handleFormSubmit}
            loading={formLoading}
            disabled={formLoading}
            style={{ backgroundColor: '#214EFF', borderRadius: '5px' }}
          >
            {isEditMode ? 'Update Car' : 'Add Car'}
          </Button>
        </Modal.Actions>
      </Modal>


      {cars.length === 0 && !loading && !error ? (
        <Message info>
          <Message.Header>No Cars Found</Message.Header>
          <p>There are no cars in the system. Click "Add New Car" to get started.</p>
        </Message>
      ) : (
        <Table celled selectable style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)' }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Make</Table.HeaderCell>
              <Table.HeaderCell>Model</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Year</Table.HeaderCell>
              <Table.HeaderCell>Daily Rate</Table.HeaderCell>
              <Table.HeaderCell>License Plate</Table.HeaderCell>
              <Table.HeaderCell>Availability</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {cars.map((car) => (
              <Table.Row key={car.id}>
                <Table.Cell>{car.id}</Table.Cell>
                <Table.Cell>{car.make}</Table.Cell>
                <Table.Cell>{car.model}</Table.Cell>
                <Table.Cell>{car.type}</Table.Cell>
                <Table.Cell>{car.year}</Table.Cell>
                <Table.Cell>₹{car.dailyRate}</Table.Cell>
                <Table.Cell>{car.licensePlate}</Table.Cell>
                <Table.Cell>
                  <Icon name={car.availabilityStatus ? 'check circle' : 'times circle'} color={car.availabilityStatus ? 'green' : 'red'} />
                  {car.availabilityStatus ? 'Available' : 'Unavailable'}
                </Table.Cell>
                <Table.Cell>{car.currentLocation}</Table.Cell>
                <Table.Cell>
                  <Button icon primary size='small' onClick={() => handleEditCarClick(car)} style={{ backgroundColor: '#214EFF', borderRadius: '5px' }}>
                    <Icon name='edit' />
                  </Button>
                  <Button icon negative size='small' onClick={() => handleDeleteCar(car.id)} style={{ borderRadius: '5px' }}>
                    <Icon name='trash' />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Container>
  );
};

export default ManageCars;