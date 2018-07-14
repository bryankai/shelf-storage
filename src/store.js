import { applyMiddleware, createStore } from 'redux';
import { combineReducers } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import {auth} from './reducers/auth'
import {spaces, searchLocation} from './reducers/spaces'
import {guests, orders} from './reducers/guests'
import {hostSpaces} from './reducers/hosts'
import {hostOrders} from './reducers/hosts'


const rootReducer = combineReducers({
    spaces, searchLocation, auth, guests, orders, hostSpaces, hostOrders
});

export default(initialState) => {
    return createStore(
      rootReducer,
      process.env.NODE_ENV === 'production' ?
        applyMiddleware(thunkMiddleware) :
        applyMiddleware(logger, thunkMiddleware)
    );
}
