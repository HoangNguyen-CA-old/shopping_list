import React, { useState, useRef } from 'react';
import {
  Container,
  Modal,
  Button,
  Form,
  FormGroup,
  Alert
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../actions/itemActions';

export default function ItemModel() {
  let [modal, setModal] = useState(false);

  const auth = useSelector(state => state.auth);
  const isAuthenticated = auth.isAuthenticated;
  const dispatch = useDispatch();

  let inputRef = useRef();

  let handleShow = () => {
    setModal(true);
  };
  let handleClose = () => {
    setModal(false);
  };

  let handleSubmit = () => {
    dispatch(addItem({ name: inputRef.current.value }));
    handleClose();
  };

  return (
    <Container className='mt-3'>
      {isAuthenticated ? (
        <Button onClick={handleShow}>Add Item</Button>
      ) : (
        <Alert variant='danger'>Please Log In To Edit Shopping List</Alert>
      )}

      <Modal show={modal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Item To Shopping List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='mt-3'>
            <FormGroup>
              <Form.Control
                ref={inputRef}
                placeholder='Enter Item Here'
                type='text'
              ></Form.Control>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>Add Item</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
