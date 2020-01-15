import React, { useEffect } from 'react';
import './App.scss';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';

import Navbar from './components/MainNavbar';
import { loadUser } from './actions/authActions';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    loadUser(dispatch, token);
  }, [dispatch, token]);
  return (
    <>
      <Navbar></Navbar>
      <ItemModal></ItemModal>
      <ShoppingList></ShoppingList>
    </>
  );
}

export default App;
