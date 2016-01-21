import React, {PropTypes, Component} from 'react'
import {Link} from 'react-router'

export default class ConfigList extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    configs: React.PropTypes.array.isRequired,
    loading: React.PropTypes.bool.isRequired
  };

  render () {
    return (
      <div>
        <h2>Posts</h2>
        <Link to="/" className="btn btn-primary">Post List Page</Link>
        <Link to="/post/new" className="btn btn-primary">New Post</Link>
        <h2>Config</h2>
        <Link to="/config/new" className="btn btn-primary">New Config</Link>
        {this.props.loading ? <p className='loader'><strong>Loading .....</strong></p> : ""}
        <ul className="list-group">{this.props.configs.map(this.renderConfig)}</ul>
      </div>
    )
  }

  renderConfig({id, site_name}) {
    return (
      <li className="list-group-item">
        {site_name}
        <Link className="btn btn-primary" to={"/config/"+id}>Edit</Link>
      </li>
    )
  }
}
