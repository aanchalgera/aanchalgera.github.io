import { base } from 'lib/firebase';

import { RECEIVE_CONFIGS } from '../constants/ActionTypes';

function receiveConfigs(configs) {
  return {
    type: RECEIVE_CONFIGS,
    data: configs
  };
}

export function fetchConfigs(component) {
  return dispatch => {
    return base.listenTo('config', {
      context: component,
      asArray: true,
      then(configs) {
        dispatch(receiveConfigs(configs));
      }
    });
  };
}
