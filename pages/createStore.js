import React from 'react';
import EditUserForm from '../components/EditUserForm';

export default function NewStore() {
  const location = 'store';
  return (
    <EditUserForm location={location} />
  );
}
