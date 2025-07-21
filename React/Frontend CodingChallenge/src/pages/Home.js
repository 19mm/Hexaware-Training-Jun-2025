import React from 'react';
import { Container, Header, Button, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Container>
      <Segment padded>
        <Header as="h1"><center>Welcome to the Book Manager 📚</center></Header>
        <p>This is your personal library manager. Use the navigation to view, add, or edit books.</p>
        <Button color="blue" onClick={() => navigate('/books')}>Go to Books</Button>
        <Button color="red" onClick={handleLogout} floated="right">Logout</Button>
      </Segment>
    </Container>
  );
};

export default Home;