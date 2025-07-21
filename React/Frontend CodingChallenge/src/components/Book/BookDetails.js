import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Header, Segment, Button, Message } from 'semantic-ui-react';
import axios from 'axios';

const BookDetails = () => {
  const { isbn } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:9090/api/books/${isbn}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBook(res.data);
      } catch (err) {
        setError('Book not found or you are not authorized.');
      }
    };

    fetchBook();
  }, [isbn, token]);

  if (error) {
    return <Message negative header="Error" content={error} />;
  }

  return (
    <Container>
      {book ? (
        <Segment>
          <Header as="h2">{book.title}</Header>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <Button onClick={() => navigate(`/edit/${book.isbn}`)} primary>Edit</Button>
          <Button onClick={() => navigate('/books')}>Back to List</Button>
        </Segment>
      ) : (
        <Message info content="Loading book details..." />
      )}
    </Container>
  );
};

export default BookDetails;