/**
* Store
*/

import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from "redux-saga";
import allReducers from '../reducers';
import appWatcher from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
let initialState = {};
let reduxMiddleware = null;

  // If there are dev tools (i.e. not in electron) and not running in Jest, include dev tools.
if (window && window.__REDUX_DEVTOOLS_EXTENSION__ && !navigator.userAgent.includes("Node.js")) {
  reduxMiddleware = compose(applyMiddleware(sagaMiddleware), reduxDevTools);
} else {
  reduxMiddleware = applyMiddleware(sagaMiddleware);
}

const store = createStore(
  allReducers,
  initialState,
  reduxMiddleware
);

// run the saga
sagaMiddleware.run(appWatcher);

window.store = store; // Just for testing!!! Delete!!!
export default store;
