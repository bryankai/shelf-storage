import { combineReducers } from 'redux';
import { FETCH_SPACES_SUCCESS, FETCH_ONE_SPACE, CREATE_MARKERS, SUBMIT_SEARCH } from '../actions/spaces'

// Helper Functions
const filterForActiveSpaces = (action) => {
  if(action.payload) {
    const filteredSpaces =  action.payload.filter((space)=> space.active)
    return filteredSpaces
  }
  return action.payload
}

// const makeMarkerArr = (action) => {
//   if(action.payload) {
//     const markerArr =  action.payload.map((space)=> {
//       return {
//         position: {
//           lat: 47.6579,
//           lng: -122.3079},
//         name: 'Marker 1',
//       }
//     })
//     return markerArr
//   }
//   return action.payload
// }
//   }
//   {
//     markers : [,
//     {
//       position: {
//         lat: 47.6579,
//         lng: -122.3159},
//       name: 'Marker 2'
//     }]
//   }
// }

// Reducers
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

const location = (locationState = [], action) => {
  console.log(action.payload)
  switch(action.type){
    case SUBMIT_SEARCH:
    console.log('location action.payload')
      return action.payload
    default:
      console.log('location state')
      return locationState
  }
}



const rootReducer = combineReducers({
    spaces, location,
});

export default rootReducer;
