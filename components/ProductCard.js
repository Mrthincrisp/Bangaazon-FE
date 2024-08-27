import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

export default function ProductCard({ productObj }) {
  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{productObj.name}</Card.Title>
          <Card.Img src={productObj.ImageUrl} />
          <Card.Text>{productObj.description}</Card.Text>
          <Card.Link>Details</Card.Link>
          <Button>Add to Cart</Button>
        </Card.Body>
      </Card>
    </>
  );
}

ProductCard.propTypes = {
  productObj: PropTypes.shape({
    name: PropTypes.string,
    ImageUrl: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};
