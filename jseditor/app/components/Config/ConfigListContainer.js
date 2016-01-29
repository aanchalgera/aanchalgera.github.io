import React, { PropTypes, Component } from 'react';
import ConfigList from './ConfigList';

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

  fetchConfigs(store) {
    this.props.base.listenTo('config', {
      context: this,
      asArray: true,
      then(configs){
        store.dispatch(this.receiveConfigs(configs));
      }
    });
  }

  componentDidMount() {
    const { store } = this.context;
    this.fetchConfigs(store);
    store.subscribe(this.render);
  }

  render() {
    const { store } = this.context;
    const state = store.getState();
    console.log('State stats :', state);

    return <ConfigList configs={state.configs} loading={state.loading} />
  }

  static contextTypes = {
    store: React.PropTypes.object
  };

  static propTypes = {
    base: React.PropTypes.object.isRequired
  };
}
