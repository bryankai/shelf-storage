import { request } from "../helper/helper";
export const FETCH_HOST = 'FETCH_HOST';
export const FETCH_HOST_SPACES_PENDING = 'FETCH_HOST_SPACES_PENDING';
export const FETCH_HOST_SPACES_SUCCESS = 'FETCH_HOST_SPACES_SUCCESS';
export const FETCH_HOST_SPACES_FAILED = 'FETCH_HOST_SPACES_FAILED';
export const FETCH_HOST_ORDERS_PENDING = 'FETCH_HOST_ORDERS_PENDING';
export const FETCH_HOST_ORDERS_SUCCESS = 'FETCH_HOST_ORDERS_SUCCESS';
export const FETCH_HOST_ORDERS_FAILED = 'FETCH_HOST_ORDERS_FAILED';

export const fetchHost = (hostId) => (
  dispatch => {
    request(`/hosts/${hostId}`)
    .then((response) => {
      dispatch({type: FETCH_HOST, payload: response.data.data})
    })
  }
)

export const fetchAllSpacesByHostId = (hostId) => (
  dispatch => {
    dispatch({type: FETCH_HOST_SPACES_PENDING});
    request(`/hosts/${hostId}/spaces`)
    .then((response) => {
      dispatch({type: FETCH_HOST_SPACES_SUCCESS, payload: response.data.data})
    })
    .catch(error => {
      dispatch({
        type: FETCH_HOST_SPACES_FAILED,
        payload: error
      })
    })
  }
)

export const fetchAllOrdersBySpaceId = (hostId, spaceId) => (
  dispatch => {
    console.log('fetchOrdersPending')
    dispatch({type: FETCH_HOST_ORDERS_PENDING});
    request(`/hosts/${hostId}/spaces/${spaceId}/spaces`)
    .then((response) => {
      console.log('fetchOrdersSuccess!',response)
      dispatch({type: FETCH_HOST_ORDERS_SUCCESS, payload: response.data.data})
    })
    .catch(error => {
      dispatch({
        type: FETCH_HOST_ORDERS_FAILED,
        payload: error
      })
    })
  }
)
