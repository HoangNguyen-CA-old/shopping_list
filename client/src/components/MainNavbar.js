import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import RegisterModal from './auth/RegisterModal';
import { useSelector } from 'react-redux';

export default function MainNavbar() {
  const auth = useSelector(state => state.auth);
  const { isAuthenticated, user } = auth;

  const authLinks = (
    <>
      <Nav.Item className='navbar-text text-success mr-3'>
        {user ? `Welcome ${user.name}` : ''}
      </Nav.Item>
      <Logout></Logout>
    </>
  );
  const guestLinks = (
    <>
      <RegisterModal></RegisterModal>
      <LoginModal></LoginModal>
    </>
  );

  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href=''>Shopping List</Navbar.Brand>
        <Nav className='ml-auto'>
          {isAuthenticated ? authLinks : guestLinks}
          <Nav.Item></Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}
