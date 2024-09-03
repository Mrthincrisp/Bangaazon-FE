import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, NavLink } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { addOrderItem, getUserOrderItems } from '../API/OrderCalls';

export default function ProductCard({ productObj, setOrderItem }) {
  const { user } = useAuth();

  const addToCart = () => {
    const payload = {
      userId: user.id,
      productId: productObj.productId,
    };
    addOrderItem(payload).then(() => {
      getUserOrderItems(user.id).then(setOrderItem);
    });
  };

  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{productObj.name}</Card.Title>
          <Card.Img src={productObj.imageUrl} alt={productObj.imageUrl} />
          <Card.Text style={{ margin: '5px 0px 5px 0px' }}>{productObj.description}</Card.Text>
          <NavLink as={Link} href={`/store/product/${productObj.productId}`}>Details</NavLink>
          <Button style={{ margin: '5px 3px 5px 3px' }} onClick={addToCart}>Add to Cart</Button>
        </Card.Body>
      </Card>
    </>
  );
}

ProductCard.propTypes = {
  productObj: PropTypes.shape({
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    description: PropTypes.string,
    productId: PropTypes.number,
  }).isRequired,
  setOrderItem: PropTypes.func.isRequired,
};
