import React, { useEffect, useState } from 'react';
import { Form, Button, Message, Container } from 'semantic-ui-react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BookForm = () => {
  const { isbn } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({ title: '', author: '', isbn: '', publicationYear: ''});
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (isbn) {
      axios.get(`http://localhost:9090/api/books/${isbn}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBook(res.data))
      .catch(() => setMessage('Book not found'));
    }
  }, [isbn,token]);

  const handleChange = (e, { name, value }) => {
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (isbn) {
        await axios.put(`http://localhost:9090/api/books/${isbn}`, book, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage('Book updated successfully');
      } else {
        await axios.post('http://localhost:9090/api/books', book, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage('Book created successfully');
      }
      setTimeout(() => navigate('/books'), 1000);
    } catch (err) {
      setMessage('Error saving book');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit} success={!!message}>
        <Form.Input
          label="Title"
          name="title"
          value={book.title}
          onChange={handleChange}
          required
        />
        <Form.Input
          label="Author"
          name="author"
          value={book.author}
          onChange={handleChange}
          required
        />
        <Form.Input
          label="Publication Year"
          name="publicationYear"
          type="number"
          onChange={handleChange}
          value={book.publicationYear || ''}
          required
        />
        <Form.Input
          label="ISBN"
          name="isbn"
          value={book.isbn}
          onChange={handleChange}
          required
          disabled={!!isbn}
        />
        {message && <Message success header="Success" content={message} />}
        <Button type="submit" color="blue">{isbn ? 'Update' : 'Create'}</Button>
        <Button color="red" onClick={() => navigate('/Books')} floated="right">Back</Button>
      </Form>
    </Container>
  );
};

export default BookForm;