import React from 'react';

const TWITTER_CHAR_LIMIT = 116;

class Social extends React.Component {
  constructor (props) {
    super(props);
    this.onArticleMetaToggle = this.props.onArticleMetaToggle.bind(this);
  }

  render () {
    return (
      <div className="modules module-home expandmodule expandmodule9">
        <h4 onClick={this.onArticleMetaToggle}>
          Twitter and Facebook publishing text
          <span className="glyphicon glyphicon-minus pull-right" ref={(c) => this._glyphiconClass = c}></span>
        </h4>
        <div ref={(c) => this._articleMetaPanel = c}>
          <div className="form-group">
            <label>Text for twitter</label>
            <span className="pull-right">{TWITTER_CHAR_LIMIT - this.props.social.twitter.length}</span>
            <textarea
              defaultValue={this.props.social.twitter}
              className="form-control"
              maxLength={TWITTER_CHAR_LIMIT}
              onKeyUp={this.props.updateSocialTwitterText}
            />
          </div>
          <div className="form-group">
            <label>Text for facebook</label>
            <textarea
              defaultValue={this.props.social.facebook}
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
