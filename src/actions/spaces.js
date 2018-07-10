import { request } from "../helper/helper";
export const FETCH_SPACES_SUCCESS = 'FETCH_SPACES_SUCCESS';
export const FETCH_ONE_SPACE = 'FETCH_ONE_SPACE';
// export const SUBMIT_SEARCH = 'SUBMIT_SEARCH';
export const UPDATE_SEARCH_LOCATION = 'UPDATE_SEARCH_LOCATION';

export const submitSearch = (searchLocation={ lat: 47.6599, lng: -122.3099 }, range=4) => (
  dispatch => {
    request(`/spaces`)
    .then((response) => {
      console.log(response.data.data, searchLocation)
      dispatch({type: FETCH_SPACES_SUCCESS, payload: {spaces: response.data.data, searchLocation, range}})
      dispatch({type: UPDATE_SEARCH_LOCATION, payload: searchLocation})
    })
  }
)

export const fetchOneSpace = (id) => (
  dispatch => {
    request(`/spaces/${id}`)
    .then((response) => {
      dispatch({type: FETCH_ONE_SPACE, payload: response.data.data})
    })
  }
)

// // Map
// export const submitSearch = (searchLocation) => (
//   dispatch => {
//       console.log('action searchLocation',searchLocation)
//       dispatch({type: SUBMIT_SEARCH, payload: searchLocation})
//   }
// )
