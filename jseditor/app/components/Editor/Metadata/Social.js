import React from 'react';

class Social extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      twitterText: ''
    };
    this.handleTwitterKeyUp = this.handleTwitterKeyUp.bind(this);
  }

  handleTwitterKeyUp (event) {
    this.setState({twitterText: event.target.value});
  }

  render () {
    return (
      <div className="modules module-home expandmodule expandmodule9">
        <h4 onClick={this.props.onArticleMetaToggle.bind(this)}>
          Twitter and Facebook publishing text
          <span className="glyphicon glyphicon-minus pull-right" ref={(c) => this._glyphiconClass = c}></span>
        </h4>
        <div ref={(c) => this._articleMetaPanel = c}>
          <div className="form-group">
            <label>Text for twitter</label>
            <span className="pull-right">{116 - this.state.twitterText.length}</span>
            <textarea
              defaultValue={this.props.twitter}
              className="form-control"
              maxLength="116"
              onBlur={this.props.updateSocialTwitterText}
              onKeyUp={this.handleTwitterKeyUp}
            />
          </div>
          <div className="form-group">
            <label>Text for facebook</label>
            <textarea
              defaultValue={this.props.facebook}
              className="form-control"
              onBlur={this.props.updateSocialFacebookText}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Social;
