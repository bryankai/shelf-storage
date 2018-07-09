import { applyMiddleware, createStore } from 'redux';
import { combineReducers } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import {spaces, location} from './reducers/spaces'
import {auth} from './reducers/auth'

const rootReducer = combineReducers({
    spaces, location, auth
});

export default(initialState) => {
    return createStore(
      rootReducer,
      process.env.NODE_ENV === 'production' ?
        applyMiddleware(thunkMiddleware) :
        applyMiddleware(logger, thunkMiddleware)
    );
}
