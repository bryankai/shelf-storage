import { CREATE_ORDER } from '../actions/guests'
import { FETCH_GUEST } from '../actions/guests'
import { FETCH_GUEST_ORDERS } from '../actions/guests'

// Reducers
export const guests = (state = [], action) => {
  switch(action.type){
    case FETCH_GUEST:
      return action.payload
    default:
      return state
  }
}

export const orders = (state = [], action) => {
  switch(action.type){
    case FETCH_GUEST_ORDERS:
      return action.payload
    case CREATE_ORDER:
      return action.payload
    default:
      return state
  }
}
