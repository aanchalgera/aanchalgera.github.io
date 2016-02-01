function receiveConfigs(configs) {
  return {
    type: 'RECEIVE_CONFIGS',
    data: configs
  }
}

export function fetchConfigs(component,base) {
  debugger
  return dispatch => {
    return base.listenTo('config', {
      context: component,
      asArray: true,
      then(configs){
        dispatch(receiveConfigs(configs));
      }
    });
  };
}
