import React, { PropTypes, Component } from 'react'
import ConfigList from './ConfigList'

export default class ConfigListContainer extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      configs: [],
      loading : true
    }
  }

  static propTypes = {
    base: React.PropTypes.object.isRequired
  };

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

  render () {
    return <ConfigList configs={this.state.configs} loading={this.state.loading} />
  }
}
