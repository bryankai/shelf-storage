import { request } from "../helper/helper";
export const CREATE_ORDER = 'CREATE_ORDER';


export const createOrder = (guestId, spaceId, startDate, endDate, totalCost) => (
  dispatch => {
    request(`/guests/${guestId}/orders`,'post', {spaceId, startDate, endDate, totalCost})
    .then((response) => {
      console.log(response)
      dispatch({type: CREATE_ORDER, payload: response.data.data})
    })
  }
)
