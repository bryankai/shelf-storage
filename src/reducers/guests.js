import { CREATE_ORDER } from '../actions/guests'
import { FETCH_GUEST } from '../actions/guests'
import { FETCH_GUEST_ORDERS_PENDING } from '../actions/guests'
import { FETCH_GUEST_ORDERS_SUCCESS } from '../actions/guests'
import { FETCH_GUEST_ORDERS_FAILED } from '../actions/guests'

// Reducers
export const guests = (state = [], action) => {
  switch(action.type){
    case FETCH_GUEST:
      return action.payload
    default:
      return state
  }
}

// Reducers
let initialState = {
  orders: null,
  isLoading: true,
  showError: false,
};

export const orders = (state = initialState, action) => {
  switch(action.type){
    case FETCH_GUEST_ORDERS_PENDING:
      return {...state, isLoading: true}
    case FETCH_GUEST_ORDERS_SUCCESS:
      console.log('success', action.payload)
      return {...state, isLoading: false, orders: action.payload}
    case FETCH_GUEST_ORDERS_FAILED:
      return {...state, isLoading: false, showError: true}
    case CREATE_ORDER:
      return {...action.payload, orderComplete: true}
    default:
      return state
  }
}
