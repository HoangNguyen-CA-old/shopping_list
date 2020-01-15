import React, { useEffect } from 'react';
import { Container, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';

export default function ShoppingList() {
  const items = useSelector(state => state.item.items);
  const dispatch = useDispatch();

  //Load items from database on component mount
  useEffect(() => {
    getItems(dispatch);
  }, [dispatch]);

  const user = useSelector(state => state.auth);
  const token = user.token;

  return (
    <Container className='mt-3'>
      <ListGroup>
        <TransitionGroup className='shopping-list'>
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames='fade'>
              <ListGroupItem>
                <Button
                  className='remove-btn bg-danger'
                  size='sm'
                  onClick={() => {
                    deleteItem(dispatch, _id, token);
                  }}
                >
                  &times;
                </Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
}
