import React from 'react';

const ProductCard = ({ name, price, image, onAdd }) => (
  <div style={{ border: '1px solid #ccc', padding: 10, margin: 10, width: 200 }}>
    <img src={image} alt={name} width="100%" />
    <h3>{name}</h3>
    <p>₹{price}</p>
    <button onClick={onAdd}>Add to Cart</button>
  </div>
);

export default ProductCard;