import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const middlewares = [thunk];

const store = compose(applyMiddleware(...middlewares))(createStore)(
  rootReducer
);

export default store;
