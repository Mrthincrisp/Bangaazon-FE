import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Offcanvas, OffcanvasBody, OffcanvasHeader,
} from 'react-bootstrap';
import {
  createOrder, deleteOrderItem, deleteUserOrderItems, getUserOrderItems,
} from '../API/OrderCalls';
import { useAuth } from '../utils/context/authContext';
import OrderItemCard from './OrderItemCard';

export default function Cart({ orderItems, setOrderItem }) {
  const { user } = useAuth();
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);

  useEffect(() => {
    getUserOrderItems(user.id).then(setOrderItem);
  }, [user.id, setOrderItem]);

  const handleDelete = (id) => {
    deleteOrderItem(id).then(() => {
      getUserOrderItems(user.id).then(setOrderItem);
    });
  };

  const checkout = () => {
    if (window.confirm('Checkout?')) {
      const payload = { buyerId: user.id };

      createOrder(user.id, payload)
        .then(() => {
          alert('Order created successfully!');
          // Optionally, clear the cart or update state
          deleteUserOrderItems(user.id).then(setOrderItem([]));
        })
        .catch((error) => {
          console.error('Error creating order:', error);
          alert('Failed to create order.');
        });
    }
  };

  return (
    <>
      <Button variant="primary" onClick={toggleShow}>
        View Cart
      </Button>
      <Offcanvas
        show={show}
        onHide={toggleShow}
        placement="end"
      >
        <OffcanvasHeader closeButton>
          <Offcanvas.Title>Your Cart</Offcanvas.Title>
        </OffcanvasHeader>
        <OffcanvasBody>
          {orderItems.map((o) => (
            <OrderItemCard
              key={o.orderItemId}
              orderItemObj={o}
              deleteOrderItem={handleDelete}
            />
          ))}
          <Button type="submit" onClick={checkout}>Checkout</Button>
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
}

Cart.propTypes = {
  orderItems: PropTypes.arrayOf(PropTypes.shape({
    orderItemId: PropTypes.number,
    product: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
    }).isRequired,
  })).isRequired,
  setOrderItem: PropTypes.func.isRequired,
};
