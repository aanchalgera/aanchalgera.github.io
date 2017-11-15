import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const middlewares = [thunk];

//adding redux logger for development environment
/*
if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger');
  const logger = createLogger();
  middlewares.push(logger);
}
*/
const store = compose(applyMiddleware(...middlewares))(createStore)(
  rootReducer
);

export default store;
