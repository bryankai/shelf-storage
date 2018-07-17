import {
  HOST_LOGIN_PENDING,
  HOST_LOGIN_SUCCESS,
  HOST_LOGIN_FAILED,
  HOST_SIGNUP_PENDING,
  HOST_SIGNUP_SUCCESS,
  HOST_SIGNUP_FAILED,
  GET_HOST,
  NOT_LOGGED_IN,
  HOST_LOGOUT
} from '../actions/hostAuth';


let initialState = {
  isLoading: true,
  user: {},
  showLoginError: false,
  showSignupError: false,
  authorized: false,
  userType: null,
};

export const hostAuth = (state = initialState, action) => {
  switch (action.type) {
    case HOST_LOGIN_PENDING:
      return {...state, isLoading: true};
    case HOST_LOGIN_SUCCESS:
      return {...state, isLoading: false, user: action.payload, authorized: true, showLoginError: false};
    case HOST_LOGIN_FAILED:
      return {...state, isLoading: false, showLoginError: true};
    case HOST_SIGNUP_PENDING:
      return {...state, isLoading: true};
    case HOST_SIGNUP_SUCCESS:
      return {...state, isLoading: false, showSignupError: false};
    case HOST_SIGNUP_FAILED:
      return {...state, isLoading: false, showSignupError: true};
    case GET_HOST:
      return {...state, isLoading: false, user: action.payload, authorized: true};
    case NOT_LOGGED_IN:
      return {...state, isLoading: false, authorized: false};
    case HOST_LOGOUT:
      return {...state, user: {}, authorized: false};
    default:
      return state;
  }
};
