import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const updateSeller = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user/store/${payload.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export default updateSeller;
