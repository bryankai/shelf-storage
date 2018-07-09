import { request } from "../helper/helper";
export const CREATE_ORDER = 'CREATE_ORDER';


export const createOrder = () => (
  dispatch => {
    request(`/guests/${id}/orders`,'post', {spaceId, startDate, endDate, totalCost})
    .then((response) => {
      console.log(response)
      dispatch({type: CREATE_ORDER, payload: response.data.data})
    })
  }
)
