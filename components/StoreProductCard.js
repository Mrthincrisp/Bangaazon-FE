import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';

export default function StoreProductCard({ productObj, handleDelete }) {
  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{productObj.name}</Card.Title>
          <Card.Img src={productObj.ImageUrl} />
          <Card.Text>{productObj.description}</Card.Text>
          <Card.Link as={Link} href={`/store/product/${productObj.productId}`}>Details</Card.Link>
          <Button style={{ margin: '5px 5px 5px 5px' }} onClick={() => handleDelete(productObj)}>Remove Product</Button>
        </Card.Body>
      </Card>
    </>
  );
}

StoreProductCard.propTypes = {
  productObj: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    ImageUrl: PropTypes.string,
    description: PropTypes.string,
    productId: PropTypes.number,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
};
