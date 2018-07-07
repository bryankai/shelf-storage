import { combineReducers } from 'redux';
import { FETCH_SPACES_SUCCESS, FETCH_ONE_SPACE, SUBMIT_SEARCH } from '../actions/spaces'

const filterForActiveSpaces = (action) => {
  if(action.payload) {
    const filteredSpaces =  action.payload.filter((space)=> space.active)
    return filteredSpaces
  }
  return action.payload
}

const spaces = (state = [], action) => {
  switch(action.type){
    case FETCH_SPACES_SUCCESS:
      return filterForActiveSpaces(action)
    case FETCH_ONE_SPACE:
      return action.payload
    default:
      return state
  }
}

const location = (state = [], action) => {
  console.log(action.payload)
  switch(action.type){
    case SUBMIT_SEARCH:
      return action.payload
    default:
      return state
  }
}

const rootReducer = combineReducers({
    spaces, location
});

export default rootReducer;
