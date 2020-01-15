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
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

export default function RegisterModal() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const error = useSelector(state => state.error);

  let [modal, setModal] = useState(false);
  let [message, setMessage] = useState('');

  const dispatch = useDispatch();

  let nameRef = useRef();
  let emailRef = useRef();
  let passwordRef = useRef();

  let handleShow = () => {
    clearErrors(dispatch);
    setModal(true);
  };
  let handleClose = useCallback(() => {
    clearErrors(dispatch);
    setModal(false);
  }, [dispatch]);

  let handleSubmit = () => {
    let name = nameRef.current.value;
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    const newUser = {
      name,
      email,
      password
    };
    register(dispatch, newUser);
    //Create new user
    //handleClose();
  };

  useEffect(() => {
    if (error.id === 'REGISTER_FAIL') {
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
      <Nav.Link onClick={handleShow}>Register</Nav.Link>

      <Modal show={modal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register an account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message ? <Alert variant='danger'>{message}</Alert> : ''}
          <Form className='mt-3'>
            <FormGroup>
              <Form.Label>Name</Form.Label>
              <Form.Control
                ref={nameRef}
                placeholder='Name'
                type='text'
                className='mb-3'
              ></Form.Control>
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
          <Button onClick={handleSubmit}>Register</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
