import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { getSingleProduct } from '../../../API/ProductCalls';

export default function ProductDetails() {
  const [product, setProduct] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    console.warn(id);
    getSingleProduct(id).then(setProduct);
  }, [id]);

  return (
    <Container>
      {console.warn(product)}
      <Card className="mb-4">
        {product.ImageUrl && (
          <Card.Img variant="top" src={product.imageUrl} alt={product.name} />
        )}
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>
            <strong>Price:</strong> ${product.price?.toFixed(2)}<br />
            <strong>Quantity:</strong> {product.quantity}<br />
            <strong>Description:</strong> {product.description}<br />
            <strong>Category:</strong> {product.category?.categoryName}<br />
            <strong>Product made on: </strong> {product.timeMade}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button type="button">Edit</Button>
          <Button variant="primary" onClick={() => router.push('/store')}>Back to Store</Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}
