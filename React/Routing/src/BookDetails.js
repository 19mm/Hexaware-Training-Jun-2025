import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function BookDetails() {
  const { isbn } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
  const token = localStorage.getItem('token'); // ✅ Define the token here

  axios.get(`http://localhost:8085/api/book/${isbn}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => setBook(res.data))
  .catch(err => console.error(err));
}, [isbn]);
  
  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <h3>Book Details</h3>
      <p><strong>Title:</strong> {book.title}</p>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
    </div>
  );
}

export default BookDetails;