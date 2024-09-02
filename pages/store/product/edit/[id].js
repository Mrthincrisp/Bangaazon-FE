import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NewProductForm from '../../../../Forms.js/ProductForm';
import { getSingleProduct } from '../../../../API/ProductCalls';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setproduct] = useState({});

  useEffect(() => {
    getSingleProduct(id).then(setproduct);
  }, [id]);

  return (
    <NewProductForm productObj={product} />
  );
}
