import React from 'react';
import PropTypes from 'prop-types';

export default function OrderItemCard({ orderItemObj }) {
  return (
    <>
      <div>
        <p>{orderItemObj.product.name}</p>
      </div>
    </>
  );
}

OrderItemCard.propTypes = {
  orderItemObj: PropTypes.shape({
    product: PropTypes.shape({
      name: PropTypes.string.isRequired,
      // Define other properties if needed
    }).isRequired,
    // Define other properties if needed
  }).isRequired,
};
