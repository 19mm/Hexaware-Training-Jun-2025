import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);

  const fetchBooks = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8085/api/book', {
    headers: {
        Authorization: `Bearer ${token}`
        }
    })
    .then(res => setBooks(res.data))
    .catch(err => console.error(err));
    };


  const deleteBook = (isbn) => {
    axios.delete(`http://localhost:8085/api/book/${isbn}`)
      .then(() => {
        alert('Book deleted');
        fetchBooks();
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h3>All Books</h3>
      <ul>
        {books.map(book => (
          <li key={book.isbn}>
            <strong>{book.title}</strong> by {book.author} — ISBN: {book.isbn}
            <br />
            v<Link to={`/books/${book.isbn}`}>View</Link> |{" "}
            <Link to={`/books/edit/${book.isbn}`}>Edit</Link>            <button onClick={() => deleteBook(book.isbn)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;