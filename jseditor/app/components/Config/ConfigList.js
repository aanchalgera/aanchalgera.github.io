import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {fetchConfigs} from '../../actions/config';

const mapStateToProps = (state) => ({
  configs: state.configs,
  loading: state.loading
});

export class ConfigList extends Component {

  componentDidMount() {
    const {dispatch, base} = this.props;
    dispatch(fetchConfigs(this, base));
  }

  render() {
    return (
      <div>
        <h2>Posts</h2>
        <Link to="/" className="btn btn-primary">Post List Page</Link>
        <Link to="/post/new" className="btn btn-primary">New Post</Link>
        <h2>Config</h2>
        <Link to="/config/new" className="btn btn-primary">New Config</Link>
        {this.props.loading ? <p className='loader'><strong>Loading .....</strong></p> : ""}
        <ul className="list-group">
          {this.props.configs.map((config, index) => {
            return (
              <li key={index} className="list-group-item">
                {config.site_name}
                <Link className="btn btn-primary" to={"/config/"+config.id}>Edit</Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  static propTypes = {
    configs: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    base: PropTypes.object.isRequired
  };
}

export default connect(mapStateToProps)(ConfigList);
