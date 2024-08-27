import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../API/ProductCalls';
import Cart from '../components/Cart';

export default function Browse() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.warn(getProducts);
    getProducts().then(setProducts);
  }, []);

  return (
    <div>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.productId} productObj={product} />
        ))}
      </div>
      <Cart />
    </div>
  );
}
