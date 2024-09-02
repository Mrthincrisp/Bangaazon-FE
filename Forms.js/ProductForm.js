import React, { useEffect, useState } from 'react';
import {
  Button, Col, Form, Row,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import getCategories from '../API/CategoryCalls';
import { createProduct, editUserProduct } from '../API/ProductCalls';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  imageUrl: '',
  name: '',
  price: 0,
  quantity: 1,
  description: '',
  categoryId: 0,
};

export default function NewProductForm({ productObj }) {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState({ ...initialState });
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getCategories().then(setCategories);
    if (productObj) setFormInput(productObj);
  }, [productObj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, userId: user.id };
    if (productObj.productId) {
      editUserProduct(payload).then(() => router.push(`/store/product/${payload.productId}`));
    } else {
      console.warn(payload);
      createProduct(payload).then(() => router.push('/store'));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter product name"
            name="name"
            value={formInput.name || ''}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a product name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            required
            type="number"
            step="0.01"
            placeholder="Enter price"
            name="price"
            value={formInput.price || ''}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid price.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationQuantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter quantity"
            name="quantity"
            value={formInput.quantity || ''}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a quantity.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCategory">
          <Form.Label>Category</Form.Label>
          <Form.Select
            required
            type="number"
            name="categoryId"
            value={formInput.categoryId}
            onChange={handleChange}
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option
                key={category.categoryId}
                value={category.categoryId}
              >
                {category.categoryName}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please select a category.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Form.Group as={Col} md="6" controlId="validationImageUrl">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter image URL"
          name="imageUrl"
          value={formInput.imageUrl || ''}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid image URL.
        </Form.Control.Feedback>
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            name="description"
            value={formInput.description || ''}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a description.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <input type="hidden" name="userId" value={formInput.userId || ''} />

      <Button type="submit">Submit</Button>
    </Form>
  );
}

NewProductForm.propTypes = {
  productObj: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    categoryId: PropTypes.number,
    imageUrl: PropTypes.string,
    description: PropTypes.string,
    productId: PropTypes.number,
  }),
};

NewProductForm.defaultProps = {
  productObj: initialState,
};
