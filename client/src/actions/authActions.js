import axios from 'axios';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../actions/types';
import { returnErrors } from './errorActions';

//check token and load user

export const loadUser = (dispatch, token) => {
  //User loading
  dispatch({ type: USER_LOADING });

  //Get token from localStorage

  axios
    .get('/api/auth/user', tokenConfig(token))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

//Register User
export const register = (dispatch, { name, email, password }) => {
  //Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  //Request body
  const body = JSON.stringify({ name, email, password });
  axios
    .post('/api/users', body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

export const logout = dispatch => {
  dispatch({
    type: LOGOUT_SUCCESS
  });
};

//Register User
export const login = (dispatch, { email, password }) => {
  //Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  //Request body
  const body = JSON.stringify({ email, password });
  axios
    .post('/api/auth', body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

//Setup config/headers and token
export const tokenConfig = token => {
  //Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
};
