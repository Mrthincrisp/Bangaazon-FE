import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function OrderCard({ order }) {
  return (
    <Card style={{ width: '15rem' }}>
      <Card.Body>
        {order.products.map((product) => (
          <div key={product.id}>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
              <p>Sold for {product.price}</p>
              <p>Sold by {product.sellerName}</p>
            </Card.Text>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    products: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      productNumber: PropTypes.number,
      sellerName: PropTypes.string,
    })).isRequired,
  }).isRequired,
};
