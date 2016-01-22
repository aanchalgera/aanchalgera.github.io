import React, { PropTypes, Component } from 'react'
import ConfigList from './ConfigList'

export default class ConfigListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      configs: [],
      loading : true
    }
  }

  componentDidMount() {
    this.props.base.listenTo('config', {
      context: this,
      asArray: true,
      then(configs){
        if (null != configs) {
          this.setState({
            configs: configs,
            loading: false
          });
        }
      }
    });
  }

  render() {
    return <ConfigList configs={this.state.configs} loading={this.state.loading} />
  }

  static propTypes = {
    base: React.PropTypes.object.isRequired
  };
}
