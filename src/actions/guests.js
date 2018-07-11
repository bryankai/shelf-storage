import { request } from "../helper/helper";
export const CREATE_ORDER = 'CREATE_ORDER';
export const FETCH_GUEST = 'FETCH_GUEST';
export const FETCH_GUEST_ORDERS = 'FETCH_GUEST_ORDERS';

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
    request(`/guests/${guestId}/orders`)
    .then((response) => {
      console.log(response)
      dispatch({type: FETCH_GUEST_ORDERS, payload: response.data.data})
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
