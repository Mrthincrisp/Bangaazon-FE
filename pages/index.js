import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../API/ProductCalls';
import Cart from '../components/Cart';
import { getUserOrderItems } from '../API/OrderCalls';
import { useAuth } from '../utils/context/authContext';

export default function Browse() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [orderItem, setOrderItem] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  useEffect(() => {
    getUserOrderItems(user.id).then(setOrderItem);
  }, [user.id]);

  return (
    <>
      <div>
        <Cart orderItems={orderItem} setOrderItem={setOrderItem} />
      </div>
      <div className="product-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {products.map((product) => (
          <ProductCard
            key={product.productId}
            productObj={product}
            setOrderItem={setOrderItem}
          />
        ))}
      </div>
    </>
  );
}
