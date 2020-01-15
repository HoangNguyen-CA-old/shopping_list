import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import RegisterModal from './auth/RegisterModal';
import { useSelector } from 'react-redux';

export default function MainNavbar() {
  const user = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isLoading = useSelector(state => state.auth.isLoading);

  const authLinks = (
    <>
      <Nav.Item className='navbar-text text-success mr-3'>
        {user ? `Logged in as ${user.name}` : ''}
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
          {isLoading ? (
            <Nav.Item className='navbar-text text-warning'>
              Attempting Login..
            </Nav.Item>
          ) : isAuthenticated ? (
            authLinks
          ) : (
            guestLinks
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
