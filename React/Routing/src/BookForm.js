import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function BookForm() {
  const [book, setBook] = useState({
  isbn: '',
  title: '',
  author: '',
  publicationYear: ''
});
  const { isbn } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isbn) {
      const token = localStorage.getItem('token');
      axios.get(`http://localhost:8085/api/book/${isbn}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => setBook(res.data))
      .catch(err => console.error(err));
    }
  }, [isbn]);

  const handleChange = e => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const request = isbn
      ? axios.put(`http://localhost:8085/api/book/${isbn}`, book, {
          headers: { Authorization: `Bearer ${token}` }
        })
      : axios.post('http://localhost:8085/api/book', book, {
          headers: { Authorization: `Bearer ${token}` }
        });

    request
      .then(() => {
        alert(`Book ${isbn ? 'updated' : 'added'} successfully`);
        navigate('/books');
      })
      .catch(err => {
        console.error(err);
        alert('Something went wrong while saving the book.');
      });
  };

  return (
    <div>
      <h3>{isbn ? 'Edit Book' : 'Add Book'}</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="isbn"
          placeholder="ISBN"
          value={book.isbn}
          onChange={handleChange}
          required
          disabled={!!isbn}
        /><br />
        <input
          name="title"
          placeholder="Title"
          value={book.title}
          onChange={handleChange}
          required
        /><br />
        <input
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
          required
        /><br />
        <input
  name="publicationYear"
  type="number"
  placeholder="Publication Year"
  value={book.publicationYear}
  onChange={handleChange}
  required
/><br />
        <button type="submit">{isbn ? 'Update' : 'Add'} Book</button>
      </form>
    </div>
  );
}

export default BookForm;