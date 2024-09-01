import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth';

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    Id: '',
    uid: user.uid,
    userName: '',
    email: '',
    seller: false,
    storeName: '',
    storeDescription: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.uid));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <br /><br />
        <h1>{user ? 'Update' : 'Create'} User Profile</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="userName"
            value={formData.userName}
            required
            placeholder="Enter Username"
            onChange={handleChange}
          />

          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={formData.email}
            placeholder="Enter email address"
            onChange={handleChange}
            required
          />

        </Form.Group>
        <Button variant="primary" type="submit">
          {user ? 'Update' : 'Create'}
        </Button>
      </Form>
    </div>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
