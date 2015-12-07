import React from 'react';
import {Link} from 'react-router';

class ConfigList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            configList: [],
            loaded: false
        };
    }

    componentDidMount() {
        this.init();
    }

    init() {
        this.props.base.fetch('config', {
          context: this,
          asArray: true,
          then(data){
            if (null != data) {
              this.setState({
                configList: data,
                loaded: true
              });
            }
          }
        });
    }

  render () {
    var loadingMessage = ""
    if (!this.state.loaded) {
      loadingMessage = <p className='loader'><strong>Loading .....</strong></p>;
    }
    var configList = this.state.configList.map((config, i) => {
      return (
        <li key={i} className="list-group-item">{config.site_name}  <Link className="btn btn-primary" to={"/config/"+config.id}>Edit</Link></li>
      )
    });
    return (
      <div>
        <h2>Posts</h2>
        <Link to="/" className="btn btn-primary">Post List Page</Link>
        <Link to="/post/new" className="btn btn-primary">New Post</Link>
        <h2>Config</h2>
        <Link to="/config/new" className="btn btn-primary">New Config</Link>
        {loadingMessage}
        <ul className="list-group">
          {configList}
        </ul>
      </div>
    )
  }
}


export default ConfigList;