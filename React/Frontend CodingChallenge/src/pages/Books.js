import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import BookList from '../components/Book/BookList';

const Books = () => {
  return (
    <Container>
      <Segment padded>
        <Header as="h1"><center>Your Book Collection</center></Header>
        <BookList />
      </Segment>
    </Container>
  );
};

export default Books;