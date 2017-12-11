import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import DevTools from 'devTools/DevTools';

const middlewares = [thunk];
const enhancer = compose(
  applyMiddleware(...middlewares),
  DevTools.instrument()
);

//adding redux logger for development environment
/*
if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger');
  const logger = createLogger();
  middlewares.push(logger);
}
*/
const store = createStore(rootReducer, enhancer);

export default store;
