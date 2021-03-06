import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchConfigs } from '../../actions/config';

const mapStateToProps = state => ({
  configs: state.configs.configs,
  loading: state.configs.loading
});

export class ConfigList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchConfigs(this));
  }

  render() {
    return (
      <div>
        <h2>Config</h2>
        <Link to="/config/new" className="btn btn-primary">
          New Config
        </Link>
        {this.props.loading ? (
          <p className="loader">
            <strong>Loading .....</strong>
          </p>
        ) : (
          ''
        )}
        <ul className="list-group">
          {this.props.configs.map((config, index) => {
            return (
              <li key={index} className="list-group-item">
                {config.site_name}
                <Link className="btn btn-primary" to={'/config/' + config.id}>
                  Edit
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

ConfigList.propTypes = {
  configs: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(ConfigList);
