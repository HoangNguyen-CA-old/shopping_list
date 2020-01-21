import React from 'react';
import { logout } from '../../actions/authActions';
import { useDispatch } from 'react-redux';
import { Nav } from 'react-bootstrap';

export default function Logout() {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(logout());
  };
  return (
    <>
      <Nav.Link onClick={handleSubmit}>Logout</Nav.Link>
    </>
  );
}
