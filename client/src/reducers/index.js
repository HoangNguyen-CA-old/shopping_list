import { combineReducers } from 'redux';
import itemReducer from './itemReducer';

export default combineReducers({
  itemReducer: itemReducer
  //more reducers heres
});
