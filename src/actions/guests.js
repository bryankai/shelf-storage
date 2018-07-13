import { request } from "../helper/helper";
export const CREATE_ORDER = 'CREATE_ORDER';
export const FETCH_GUEST = 'FETCH_GUEST';
export const FETCH_GUEST_ORDERS_PENDING = 'FETCH_GUEST_ORDERS_PENDING';
export const FETCH_GUEST_ORDERS_SUCCESS = 'FETCH_GUEST_ORDERS_SUCCESS';
export const FETCH_GUEST_ORDERS_FAILED = 'FETCH_GUEST_ORDERS_FAILED';

export const fetchGuest = (guestId) => (
  dispatch => {
    request(`/guests/${guestId}`)
    .then((response) => {
      console.log(response)
      dispatch({type: FETCH_GUEST, payload: response.data.data})
    })
  }
)

export const fetchOrdersByGuestId = (guestId) => (
  dispatch => {
    console.log('fetchOrdersPending')
    dispatch({type: FETCH_GUEST_ORDERS_PENDING});
    request(`/guests/${guestId}/orders`)
    .then((response) => {
      console.log('fetchOrdersSuccess!',response)
      dispatch({type: FETCH_GUEST_ORDERS_SUCCESS, payload: response.data.data})
    })
    .catch(error => {
      dispatch({
        type: FETCH_GUEST_ORDERS_FAILED,
        payload: error
      })
    })
  }
)

export const createOrder = (guestId, spaceId, startDate, endDate, totalCost) => (
  dispatch => {
    request(`/guests/${guestId}/orders`,'post', {spaceId, startDate, endDate, totalCost})
    .then((response) => {
      console.log(response)
      dispatch({type: CREATE_ORDER, payload: response.data.data})
    })
  }
)
