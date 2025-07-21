import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import BookForm from '../components/Book/BookForm';

const BookEdit = () => {
  return (
    <Container text>
      <Segment padded>
        <Header as="h2">Book Editor</Header>
        <BookForm />
      </Segment>
    </Container>
  );
};

export default BookEdit;