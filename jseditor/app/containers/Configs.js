import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import ConfigList from '../components/Config/ConfigList';
import * as ConfigActions from '../actions/config';

class Configs extends Component {
  componentDidMount() {
    this.props.actions.fetchConfigs(this, this.props.base);
  }

  render() {
    const {configs, loading} = this.props;
    return <ConfigList configs={configs} loading={loading} />
  }

  static propTypes = {
    base: PropTypes.object.isRequired,
    configs: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
  };
}

function mapStateToProps(state) {
  return {
    configs: state.configs,
    loading: state.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ConfigActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Configs);
