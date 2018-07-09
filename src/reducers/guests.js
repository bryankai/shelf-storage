import { combineReducers } from 'redux';
import { CREATE_ORDER } from '../actions/spaces'

// Reducers
const orders = (state = [], action) => {
  switch(action.type){
    case CREATE_ORDER:
      return filterForActiveSpaces(action)
    default:
      return state
  }
}



const rootReducer = combineReducers({
    orders,
});

export default rootReducer;
