import { useEffect, useState } from "react";
import Product from "./Product";

const ProductAPI = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((e) => console.error("Error fetching products:", e));
  }, []);

  return (
    <div>
      <h1>Product Catalog</h1>
      {products.map((item) => (
        <Product
          id={item.id}
          name={item.title}
          price={item.price}
          category={item.category}
        />
      ))}
    </div>
  );
};

export default ProductAPI;
