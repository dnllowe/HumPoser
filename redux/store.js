'use strict';

import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';

import initialState from './initialState';

const middleware = applyMiddleware(thunk);
const store = createStore(reducer, initialState, middleware);

export default store;