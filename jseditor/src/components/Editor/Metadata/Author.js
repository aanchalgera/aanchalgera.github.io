import React from 'react';
import jquery from 'jquery';
import Typeahead from 'react-bootstrap-typeahead';

export default class Author extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      isError: false,
      message: '',
      currentUser: null
    };
    this.selectUser = this.selectUser.bind(this);
  }

  setMessage(isError = false, message) {
    this.setState({
      isError: isError,
      message: message
    });
  }

  componentDidMount() {
    jquery.ajax({
      url: this.props.blogUrl + '/admin/users',
      crossDomain: true,
      dataType : 'json',
      xhrFields: {
        withCredentials: true
      }
    })
    .fail((jqxhr, textStatus, error) => {
      this.setMessage(true, error);
    })
    .done((data) => {
      let user = data.users.filter(user => {
        return user.id == this.props.userId;
      });
      this.setState({
        userList: data.users,
        currentUser: user[0]
      });
    });
  }

  selectUser(users) {
    let currentUser = users[0];
    this.setState({ currentUser }, () => this.props.editAuthorInfo(currentUser.id));
  }

  render() {
    return (
      <div className="modules module-seo">
        <h4 onClick={this.props.onArticleMetaToggle.bind(this)}>
          Author and social share visibility
          <span className="glyphicon glyphicon-plus pull-right" ref={(c) => this._glyphiconClass = c}></span>
        </h4>
        <div className="collapsed-content" ref={(c) => this._articleMetaPanel = c}>
          <div className="form-group">
            <label>
              <input type="checkbox"
                onChange={this.props.toggleSocialShareVisibility}
                checked={!this.props.showSocialShareButtons}
              />
              Hide social share <span className="hint">(from top)</span>
            </label>
          </div>
          <div className="form-group">
            <label>
              <input type="checkbox"
                onChange={this.props.toggleDateVisibility}
                checked={this.props.showDate}
              />
              Show date
            </label>
          </div>
          <div className="form-group">
            <label>
              <input type="checkbox"
                checked={this.props.author ? this.props.author.showAuthorInfo : false}
                onChange={this.props.toggleAuthorInfo}
              />
              Show author information
            </label>
          </div>
          <div className="form-group">
            <label>Author:</label>
            <Typeahead
              placeholder="Type to search for authors"
              onChange={this.selectUser}
              options={this.state.userList}
              labelKey='display_name'
              selected={[this.state.currentUser]}
            />
          </div>
        </div>
      </div>
    );
  }
}
