import React, { useEffect, useState } from 'react';
import { Button, Table, Container } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:9090/api/books', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBooks(res.data);
  };

  const deleteBook = async (isbn) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:9090/api/books/${isbn}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchBooks(); 
  };

  useEffect(() => {
  const fetchBooks = async () => {
    const token = localStorage.getItem('token');

    if (!token || !token.includes('.')) {
      console.warn('Invalid token format – redirecting');
      navigate('/login');
      return;
    }

    try {
      const res = await axios.get('http://localhost:9090/api/books', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooks(res.data);
    } catch (err) {
      console.error('Error fetching books:', err);
      if (err.response?.status === 403) navigate('/login');
    }
  };

  fetchBooks();
}, [navigate]);

  return (
    <Container>
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Publication Year</Table.HeaderCell>
            <Table.HeaderCell>Author</Table.HeaderCell>
            <Table.HeaderCell>ISBN</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {books.map((book) => (
            <Table.Row key={book.isbn}>
              <Table.Cell>{book.title}</Table.Cell>
              <Table.Cell>{book.publicationYear}</Table.Cell>
              <Table.Cell>{book.author}</Table.Cell>
              <Table.Cell>{book.isbn}</Table.Cell>
              <Table.Cell>
                <Button size="small" onClick={() => navigate(`/edit/${book.isbn}`)}>Edit</Button>
                <Button color="red" size="small" onClick={() => deleteBook(book.isbn)}>Delete</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Button primary onClick={() => navigate('/edit')}>Add New Book</Button>
      <Button color="red" onClick={() => navigate('/Home')} floated="right">Back</Button>
    </Container>
  );
};

export default BookList;