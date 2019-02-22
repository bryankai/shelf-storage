import { request, AuthenticationService } from "../helper/helper";

export const HOST_LOGIN_PENDING = 'HOST_LOGIN_PENDING';
export const HOST_LOGIN_SUCCESS = 'HOST_LOGIN_SUCCESS';
export const HOST_LOGIN_FAILED = 'HOST_LOGIN_FAILED';

export const HOST_SIGNUP_PENDING = 'HOST_SIGNUP_PENDING';
export const HOST_SIGNUP_SUCCESS = 'HOST_SIGNUP_SUCCESS';
export const HOST_SIGNUP_FAILED = 'HOST_SIGNUP_FAILED';

export const GET_HOST = 'GET_HOST';
export const NOT_LOGGED_IN = 'NOT_LOGGED_IN';

export const HOST_LOGOUT = 'HOST_LOGOUT';

export const hostLogin = (email, password) => (
  dispatch => {
    dispatch({type: HOST_LOGIN_PENDING});
    return request('/hostAuth/token', 'post', {email, password})
    .then(response => {
      localStorage.setItem('token', response.data.token);
      return request('/hostAuth/token');
    })
    .then(async response => {
      await AuthenticationService.setAuthState(response.data);
      dispatch({
        type: HOST_LOGIN_SUCCESS,
        payload: response.data
      })
      return true
    })
    .catch(error => {
      dispatch({
        type: HOST_LOGIN_FAILED,
        payload: error
      });
    });
  }
);

export const hostSignup = (newUser) => (
  dispatch => {
    dispatch({type: HOST_SIGNUP_PENDING});
    return request('/hosts', 'post', newUser)
    .then(response => {
      dispatch({
        type: HOST_SIGNUP_SUCCESS,
        payload: response.data
      });
      return true
    })
    .catch(error => {
      dispatch({
        type: HOST_SIGNUP_FAILED,
        payload: error
      });
      return false
    });
  }
);

export const getHostUser = () => (
  dispatch => {
    return request('/hostAuth/token')
    .then(response => {
      dispatch({
        type: GET_HOST,
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

export const hostLogout = () => (
  dispatch => {
    localStorage.removeItem('token');
    dispatch({type: HOST_LOGOUT});
    AuthenticationService.setAuthState(null)
  }
);
