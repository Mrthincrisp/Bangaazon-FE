import React from 'react';
import PropTypes from 'prop-types';

export default function OrderItemCard({ orderItemObj, deleteOrderItem }) {
  return (
    <>
      <div>
        <button
          type="button"
          onClick={() => deleteOrderItem(orderItemObj.orderItemId)}
          style={{
            border: 'none', background: 'none', cursor: 'pointer', color: 'red',
          }}
        >
          &times;
        </button>
        <p>{orderItemObj.product.name}  {orderItemObj.product.price}</p>

      </div>
    </>
  );
}

OrderItemCard.propTypes = {
  orderItemObj: PropTypes.shape({
    product: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
    }).isRequired,
    orderItemId: PropTypes.number,
  }).isRequired,
  deleteOrderItem: PropTypes.func.isRequired,
};
