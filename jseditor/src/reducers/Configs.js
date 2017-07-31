import {RECEIVE_CONFIGS} from '../constants/ActionTypes';

const initialState = {
  configs: [],
  loading: true
};

const configs = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CONFIGS:
      return Object.assign({}, state, {
        configs: action.data,
        loading: false
      });
    default:
      return state;
  }
};

export default configs;
