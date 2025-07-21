// src/components/FlowerList.js
import React from 'react';
import ProductCard from './ProductCard';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const flowers = [
  { id: 1, name: "Rose", price: 50, image: "https://source.unsplash.com/200x200/?rose" },
  { id: 2, name: "Tulip", price: 40, image: "https://source.unsplash.com/200x200/?tulip" },
  { id: 3, name: "Lily", price: 60, image: "https://source.unsplash.com/200x200/?lily" },
  { id: 4, name: "Daisy", price: 30, image: "https://source.unsplash.com/200x200/?daisy" },
  { id: 5, name: "Sunflower", price: 45, image: "https://source.unsplash.com/200x200/?sunflower" },
  { id: 6, name: "Marigold", price: 35, image: "https://source.unsplash.com/200x200/?marigold" },
  { id: 7, name: "Jasmine", price: 55, image: "https://source.unsplash.com/200x200/?jasmine" },
  { id: 8, name: "Lavender", price: 70, image: "https://source.unsplash.com/200x200/?lavender" },
  { id: 9, name: "Orchid", price: 80, image: "https://source.unsplash.com/200x200/?orchid" },
  { id: 10, name: "Peony", price: 65, image: "https://source.unsplash.com/200x200/?peony" }
];

const FlowerList = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Flowers</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {flowers.map(flower => (
          <ProductCard
            name={flower.name}
            price={flower.price}
            image={flower.image}
            onAdd={() => dispatch(addToCart(flower))}
          />
        ))}
      </div>
    </div>
  );
};


export default FlowerList;