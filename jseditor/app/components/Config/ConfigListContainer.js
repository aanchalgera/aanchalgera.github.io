import React, { PropTypes, Component } from 'react';
import ConfigList from './ConfigList';
import { createStore } from 'redux';

//reducer
const initialState = {
  configs: [],
  loading: true
};

const configs = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_CONFIGS':
      return Object.assign({}, state, {
        configs: action.data,
        loading: false
      })
    default:
      return state;
  }
};

//store
const store = createStore(configs);

export default class ConfigListContainer extends Component {
  constructor(props) {
    super(props);
  }

  //action
  receiveConfigs(configs) {
    return {
      type: 'RECEIVE_CONFIGS',
      data: configs
    }
  }

  fetchConfigs() {
    this.props.base.listenTo('config', {
      context: this,
      asArray: true,
      then(configs){
        store.dispatch(this.receiveConfigs(configs));
      }
    });
  }

  componentDidMount() {
    this.fetchConfigs();
    store.subscribe(this.render);
  }

  render() {
    console.log('State stats :', store.getState());
    return <ConfigList configs={store.getState().configs} loading={store.getState().loading} />
  }

  static propTypes = {
    base: React.PropTypes.object.isRequired
  };
}
