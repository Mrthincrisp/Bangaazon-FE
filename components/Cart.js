import React, { useEffect, useState } from 'react';
import {
  Button, Offcanvas, OffcanvasBody, OffcanvasHeader,
} from 'react-bootstrap';
import { getUserOrderItems } from '../API/OrderCalls';
import { useAuth } from '../utils/context/authContext';
import OrderItemCard from './OrderItemCard';

export default function Cart() {
  const [order, setOrder] = useState([]);
  const { user } = useAuth();
  const [show, setShow] = useState(true);

  const toggleShow = () => setShow(!show);

  useEffect(() => {
    getUserOrderItems(user.id).then(setOrder);
  }, [user.id]);

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
          {order.map((o) => (
            <OrderItemCard key={o.orderItemId} orderItemObj={o} />
          ))}
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
}
