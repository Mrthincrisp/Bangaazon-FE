import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { deleteUserProduct, getUserProducts } from '../API/ProductCalls';
import { useAuth } from '../utils/context/authContext';
import StoreProductCard from '../components/StoreProductCard';

export default function Store() {
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    if (user?.id) {
      try {
        const data = await getUserProducts(user.id);
        setProducts(data || []);
      } catch (error) {
        setProducts([]);
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, [user]);

  const deleteProduct = (productObj) => {
    if (window.confirm(`Delete ${productObj.name} from the store entirely?`)) {
      deleteUserProduct(productObj.productId).then(() => getProducts());
    }
  };

  return (
    <div>
      <Button style={{ margin: '5px 0px 5px 0px' }} type="button" onClick={() => router.push('store/product/new')}>Add Product</Button>
      <div>
        {products.length > 0 ? (
          products.map((product) => (
            <StoreProductCard
              key={product.productId}
              productObj={product}
              handleDelete={deleteProduct}
            />
          ))
        ) : (
          <p>No products to sell.</p>
        )}
      </div>
    </div>
  );
}
