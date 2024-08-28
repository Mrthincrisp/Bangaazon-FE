import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Offcanvas, OffcanvasBody, OffcanvasHeader,
} from 'react-bootstrap';
import { deleteOrderItem, getUserOrderItems } from '../API/OrderCalls';
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
