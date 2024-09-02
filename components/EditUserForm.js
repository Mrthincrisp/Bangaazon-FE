import React, { useState } from 'react';
import {
  Button, Col, Form, Row,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import updateSeller from '../API/UserCalls';
import { useAuth } from '../utils/context/authContext';

export default function EditUserForm({ location }) {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [formInput, setFormInput] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {};
    if (location === 'store') {
      payload = { ...formInput, seller: true };
    } else {
      payload = { ...formInput };
    }
    updateSeller(payload).then(() => {
      updateUser(user.uid);
      router.push('/store');
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationUserName">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="enter a user name"
            name="userName"
            value={formInput.userName}
            onChange={handleChange}
          />

          <Form.Control.Feedback type="invalid">
            Please provide a username.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Email"
            name="email"
            value={formInput.email}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Form.Group as={Col} md="6" controlId="validationStoreName">
        <Form.Label>Store Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Store Name"
          name="storeName"
          value={formInput.storeName}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">
          Please provide a store name.
        </Form.Control.Feedback>
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationStoreDescription">
          <Form.Label>Store Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Store Description"
            name="storeDescription"
            value={formInput.storeDescription}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a store description.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Button type="submit">Submit</Button>
    </Form>
  );
}

EditUserForm.propTypes = {
  location: PropTypes.string.isRequired,
};
