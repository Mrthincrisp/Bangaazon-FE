import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getUsersOrders } from '../API/OrderCalls';
import OrderCard from './OrderCard';

export default function OrderHistoryComponent() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getUsersOrders(user.id).then(setOrders);
  }, [user.id]);

  return (
    <>
      {orders.length > 0
        ? (
          <Card style={{ width: '18rem' }}>
            <Card.Body style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {orders.map((order) => (
                <div key={order.id}>
                  <Card.Title>Order number: {order.id}</Card.Title>
                  <OrderCard order={order} />
                </div>
              ))}
            </Card.Body>
          </Card>
        )
        : 'No oders made.'}
    </>
  );
}
