import { request, AuthenticationService } from "../helper/helper";

export const USER_LOGIN_PENDING = 'USER_LOGIN_PENDING';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

export const USER_SIGNUP_PENDING = 'USER_SIGNUP_PENDING';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_FAILED = 'USER_SIGNUP_FAILED';

export const GET_USER = 'GET_USER';
export const NOT_LOGGED_IN = 'NOT_LOGGED_IN';

export const GUEST_LOGOUT = 'GUEST_LOGOUT';

export const userLogin = (email, password) => (
  dispatch => {
    dispatch({type: USER_LOGIN_PENDING});
    return request('/auth/token', 'post', {email, password})
    .then(response => {
      localStorage.setItem('token', response.data.token);
      return request('/auth/token');
    })
    .then(async response => {
      await AuthenticationService.setAuthState(response.data);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: response.data
      })
      return true
    })
    .catch(error => {
      dispatch({
        type: USER_LOGIN_FAILED,
        payload: error
      });
      return false
    });
  }
);

export const userSignup = (newUser) => (
  dispatch => {
    dispatch({type: USER_SIGNUP_PENDING});
    return request('/guests', 'post', newUser)
    .then(response => {
      dispatch({
        type: USER_SIGNUP_SUCCESS,
        payload: response.data
      });
      return true
    })
    .catch(error => {
      dispatch({
        type: USER_SIGNUP_FAILED,
        payload: error
      });
    });
  }
);

export const getUser = () => (
  dispatch => {
    return request('/auth/token')
    .then(response => {
      dispatch({
        type: GET_USER,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: NOT_LOGGED_IN,
        payload: error
      });
    });
  }
);

export const guestLogout = () => (
  dispatch => {
    localStorage.removeItem('token');
    dispatch({type: GUEST_LOGOUT});
    AuthenticationService.setAuthState(null)
  }
);
