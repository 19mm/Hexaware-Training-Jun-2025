import { useEffect, useState } from "react";
import Product from "./Product";

const FilterProductAPI = () => {
  const [products, setProducts] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const [categorySearch, setCSearch] = useState("");
  const [titleSearch, setTSearch] = useState("");

  const handleCSearch = (e) => setCSearch(e.target.value);
  const handleTSearch = (e) => setTSearch(e.target.value);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFilterProduct(data.products);
      })
      .catch((e) => console.error("Error fetching products:", e));
  }, []);

  useEffect(() => {
    const filterData = products.filter((product) => {
      const matchesCategory = product.category
        .toLowerCase()
        .includes(categorySearch.toLowerCase());
      const matchesTitle = product.title
        .toLowerCase()
        .includes(titleSearch.toLowerCase());
      return matchesCategory && matchesTitle;
    });
    setFilterProduct(filterData);
  }, [categorySearch, titleSearch, products]);

  return (
    <>
      <input
        type="text"
        placeholder="Search by Category"
        onChange={handleCSearch}
        value={categorySearch}
      />
      <input
        type="text"
        placeholder="Search by Title"
        onChange={handleTSearch}
        value={titleSearch}
      />
      {filterProduct.map((p) => (
        <Product
          key={p.id}
          id={p.id}
          name={p.title}
          price={p.price}
          category={p.category}
        />
      ))}
    </>
  );
};

export default FilterProductAPI;
