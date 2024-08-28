import React from 'react';
import PropTypes from 'prop-types';

export default function OrderItemCard({ orderItemObj, deleteOrderItem }) {
  return (
    <>
      <div>
        <p>{orderItemObj.product.name} </p>
        <button
          type="button"
          onClick={() => deleteOrderItem(orderItemObj.orderItemId)}
          style={{
            border: 'none', background: 'none', cursor: 'pointer', color: 'red',
          }}
        >
          &times;
        </button>
        <p>{orderItemObj.product.price}</p>

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
