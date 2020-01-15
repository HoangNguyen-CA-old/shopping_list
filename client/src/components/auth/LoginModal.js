import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Container,
  Modal,
  Button,
  Form,
  FormGroup,
  Alert,
  Nav
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

export default function LoginModal() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const error = useSelector(state => state.error);

  let [modal, setModal] = useState(false);
  let [message, setMessage] = useState('');

  const dispatch = useDispatch();

  let emailRef = useRef();
  let passwordRef = useRef();

  const handleShow = () => {
    clearErrors(dispatch);
    setModal(true);
  };
  const handleClose = useCallback(() => {
    clearErrors(dispatch);
    setModal(false);
  }, [dispatch]);
  const handleSubmit = () => {
    let email = emailRef.current.value;
    let password = passwordRef.current.value;

    const user = {
      email,
      password
    };
    login(dispatch, user);
  };

  useEffect(() => {
    if (error.id === 'LOGIN_FAIL') {
      setMessage(error.msg.msg);
    } else {
      setMessage('');
    }
  }, [error]);

  useEffect(() => {
    if (isAuthenticated) {
      handleClose();
    }
  }, [isAuthenticated, handleClose]);

  return (
    <Container>
      <Nav.Link onClick={handleShow}>Login</Nav.Link>

      <Modal show={modal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log in to an account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message ? <Alert variant='danger'>{message}</Alert> : ''}
          <Form className='mt-3'>
            <FormGroup>
              <Form.Label>Email</Form.Label>
              <Form.Control
                ref={emailRef}
                placeholder='Email'
                type='text'
                className='mb-3'
              ></Form.Control>
              <Form.Label>Password</Form.Label>
              <Form.Control
                ref={passwordRef}
                placeholder='Password'
                type='text'
                className='mb-3'
              ></Form.Control>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>Login</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
