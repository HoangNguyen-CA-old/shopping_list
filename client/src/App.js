import React from 'react';
import './App.scss';
import ShoppingList from './components/ShoppingList';
import { Provider } from 'react-redux';
import store from './store';
import ItemModal from './components/ItemModal';

function App() {
  return (
    <Provider store={store}>
      <ItemModal></ItemModal>
      <ShoppingList></ShoppingList>
    </Provider>
  );
}

export default App;
