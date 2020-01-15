import React, { useEffect } from 'react';
import { Container, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';

export default function ShoppingList() {
  const items = useSelector(state => state.item.items);
  const isLoading = useSelector(state => state.item.loading);
  const token = useSelector(state => state.auth.token);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  //Load items from database on component mount
  useEffect(() => {
    getItems(dispatch);
  }, [dispatch]);

  return (
    <Container className='mt-3'>
      <ListGroup>
        <TransitionGroup className='shopping  -list'>
          {isLoading ? (
            <h1 className='display-4'>Items loading...</h1>
          ) : (
            <h1></h1>
          )}
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames='fade'>
              <ListGroupItem>
                {isAuthenticated ? (
                  <Button
                    className='remove-btn bg-danger'
                    size='sm'
                    onClick={() => {
                      deleteItem(dispatch, _id, token);
                    }}
                  >
                    &times;
                  </Button>
                ) : (
                  <Button
                    className='remove-btn bg-light border-light'
                    size='sm'
                  >
                    &times;
                  </Button>
                )}

                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
}
