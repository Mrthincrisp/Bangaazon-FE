import { clientCredentials } from '../utils/client';

const getProducts = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/product`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleProduct = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/product/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getProducts,
  getSingleProduct,
};
