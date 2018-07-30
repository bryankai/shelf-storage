import { FETCH_HOST } from '../actions/hosts'
import { FETCH_HOST_SPACES_PENDING } from '../actions/hosts'
import { FETCH_HOST_SPACES_SUCCESS } from '../actions/hosts'
import { FETCH_HOST_SPACES_FAILED } from '../actions/hosts'
import { FETCH_HOST_ORDERS_PENDING } from '../actions/hosts'
import { FETCH_HOST_ORDERS_SUCCESS } from '../actions/hosts'
import { FETCH_HOST_ORDERS_FAILED } from '../actions/hosts'

// Reducers
export const hosts = (state = [], action) => {
  switch(action.type){
    case FETCH_HOST:
      return action.payload
    default:
      return state
  }
}

// Reducers
let spacesInitialState = {
  hostSpaces: null,
  isLoading: true,
  showError: false,
};

export const hostSpaces = (state = spacesInitialState, action) => {
  switch(action.type){
    case FETCH_HOST_SPACES_PENDING:
      return {...state, isLoading: true}
    case FETCH_HOST_SPACES_SUCCESS:
      return {...state, isLoading: false, hostSpaces: action.payload}
    case FETCH_HOST_SPACES_FAILED:
      return {...state, isLoading: false, showError: true}
    default:
      return state
  }
}

let ordersInitialState = {
  hostOrders: null,
  isLoading: true,
  showError: false,
};

export const hostOrders = (state = ordersInitialState, action) => {
  switch(action.type){
    case FETCH_HOST_ORDERS_PENDING:
      return {...state, isLoading: true}
    case FETCH_HOST_ORDERS_SUCCESS:
      return {...state, isLoading: false, hostOrders: action.payload}
    case FETCH_HOST_ORDERS_FAILED:
      return {...state, isLoading: false, showError: true}
    default:
      return state
  }
}
