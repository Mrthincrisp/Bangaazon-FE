import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { getSingleProduct } from '../../../API/ProductCalls';
import { useAuth } from '../../../utils/context/authContext';

export default function ProductDetails() {
  const { user } = useAuth();
  const [product, setProduct] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleProduct(id).then(setProduct);
  }, [id]);

  return (
    <Container>
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
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          {user.id === product.userId
            ? <Button style={{ margin: '0px 3px 0px 3px' }} type="button" onClick={() => router.push(`/store/product/edit/${id}`)}>Edit</Button> : '' }
          <Button style={{ margin: '0px 3px 0px 3px' }} variant="primary" onClick={() => router.push('/store')}>Back to Store</Button>
          {user.seller ? <Button style={{ margin: '0px 3px 0px 3px' }} variant="primary" onClick={() => router.push('/')}>Back Browsing</Button> : '' }
        </Card.Footer>
      </Card>
    </Container>
  );
}
