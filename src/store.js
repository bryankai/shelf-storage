import { applyMiddleware, createStore } from 'redux';
import { combineReducers } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import {auth} from './reducers/auth'
import {spaces, searchLocation} from './reducers/spaces'
import {guests, orders} from './reducers/guests'

const rootReducer = combineReducers({
    spaces, searchLocation, auth, guests, orders
});

export default(initialState) => {
    return createStore(
      rootReducer,
      process.env.NODE_ENV === 'production' ?
        applyMiddleware(thunkMiddleware) :
        applyMiddleware(logger, thunkMiddleware)
    );
}
