import { applyMiddleware, createStore } from 'redux';
import { combineReducers } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import {auth} from './reducers/auth'
import {hostAuth} from './reducers/hostAuth'
import {spaces, oneSpace, searchLocation} from './reducers/spaces'
import {guests, orders} from './reducers/guests'
import {hosts, hostSpaces, hostOrders} from './reducers/hosts'


const rootReducer = combineReducers({
    spaces, oneSpace, searchLocation, auth, hostAuth, guests, hosts, orders, hostSpaces, hostOrders,
});

export default(initialState) => {
    return createStore(
      rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      process.env.NODE_ENV === 'production' ?
        applyMiddleware(thunkMiddleware) :
        applyMiddleware(logger, thunkMiddleware)
    );
}
