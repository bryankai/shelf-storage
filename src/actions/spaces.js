import { request } from "../helper/helper";
export const FETCH_SPACES_SUCCESS = 'FETCH_SPACES_SUCCESS';
export const FETCH_ONE_SPACE = 'FETCH_ONE_SPACE';
export const SUBMIT_SEARCH = 'SUBMIT_SEARCH';

export const fetchSpaces = () => (
  dispatch => {
    request(`/spaces`)
    .then((response) => {
      console.log(response)
      dispatch({type: FETCH_SPACES_SUCCESS, payload: response.data.data})
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

// Map
export const submitSearch = (location) => (
  dispatch => {
      console.log(location)
      dispatch({type: SUBMIT_SEARCH, payload: location})
  }
)
