import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getUserOrderItems = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user/${uid}/orderitem`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const addOrderItem = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user/orderitem`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteOrderItem = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orderitem/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export {
  getUserOrderItems,
  addOrderItem,
  deleteOrderItem,
};
