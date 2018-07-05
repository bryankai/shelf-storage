import { combineReducers } from 'redux';
import { FETCH_SPACES_SUCCESS, FETCH_ONE_SPACE, CHECK } from '../actions/spaces'

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
    default:
      return state
  }
}

const rootReducer = combineReducers({
    spaces,
});

export default rootReducer;
