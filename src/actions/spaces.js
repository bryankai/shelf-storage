import { request } from "../helper/helper";
export const SET_SEARCH_STRING = 'SET_SEARCH_STRING';
export const FETCH_SPACES_PENDING = 'FETCH_SPACES_PENDING';
export const FETCH_SPACES_SUCCESS = 'FETCH_SPACES_SUCCESS';
export const FETCH_SPACES_FAILED = 'FETCH_SPACES_FAILED';
export const FETCH_ONE_SPACE = 'FETCH_ONE_SPACE';
export const UPDATE_SEARCH_LOCATION = 'UPDATE_SEARCH_LOCATION';

export const setSearchString = (searchString) => {
  return {
    type: SET_SEARCH_STRING,
    payload: searchString
  }
}

export const submitSearch = (searchLocation={ lat: 47.6599, lng: -122.3099 }, range=4) => (
  dispatch => {
    dispatch({type: FETCH_SPACES_PENDING});
    request(`/spaces`)
    .then((response) => {
      dispatch({type: FETCH_SPACES_SUCCESS, payload: {spaces: response.data.data, searchLocation, range}})
      dispatch({type: UPDATE_SEARCH_LOCATION, payload: searchLocation})
    })
    .catch(error => {
      dispatch({
        type: FETCH_SPACES_FAILED,
        payload: error
      })
    })
  }
)

export const fetchOneSpace = (id) => (
  dispatch => {
    request(`/spaces/${id}`)
    .then((response) => {
      dispatch({type: FETCH_ONE_SPACE, payload: {spaces: response.data.data}})
    })
  }
)
