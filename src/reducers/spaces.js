import { getDistance } from "../helper/helper";
import {
  FETCH_SPACES_PENDING,
  FETCH_SPACES_SUCCESS,
  FETCH_SPACES_FAILED,
  FETCH_ONE_SPACE,
  UPDATE_SEARCH_LOCATION
} from '../actions/spaces'

// Helper Functions
const filterForActiveNearbySpaces = (payload) => {
  if(payload) {
    const filteredSpaces =  payload.spaces.filter((space, index)=> {
      if(space.active) {
        const spaceLocation = {lat: space.lat, lng: space.lng}
        const distance = getDistance(spaceLocation, payload.searchLocation)
        if(distance<payload.range) {
          return true
        }
      }
      return false
    })
    return filteredSpaces
  }
}

// Reducers
let spacesInitialState = {
  spaces:[],
  isLoading: true,
  showError: false,
};

export const spaces = (state = spacesInitialState, action) => {
  switch(action.type){
    case FETCH_SPACES_PENDING:
      return {...state, isLoading: true}
    case FETCH_SPACES_SUCCESS:
      return {...state, isLoading: false, spaces: filterForActiveNearbySpaces(action.payload)}
    case FETCH_SPACES_FAILED:
      return {...state, isLoading: false, showError: true}
    case FETCH_ONE_SPACE:
      return action.payload
    default:
      return state
  }
}

export const searchLocation = (state = null, action) => {
  switch(action.type){
    case UPDATE_SEARCH_LOCATION:
      return action.payload
    default:
      return state
  }
}
