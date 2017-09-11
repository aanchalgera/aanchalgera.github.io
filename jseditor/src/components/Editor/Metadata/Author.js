import React from 'react';

export default class Author extends React.Component {
  render() {
    return (
      <div className="modules module-seo">
        <h4 onClick={this.props.onArticleMetaToggle.bind(this)}>
          Social share visibility
          <span
            className="glyphicon glyphicon-plus pull-right"
            ref={c => (this._glyphiconClass = c)}
          />
        </h4>
        <div
          className="collapsed-content"
          ref={c => (this._articleMetaPanel = c)}
        >
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                onChange={this.props.toggleSocialShareVisibility}
                checked={!this.props.showSocialShareButtons}
              />
              Hide social share <span className="hint">(from top)</span>
            </label>
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                onChange={this.props.toggleDateVisibility}
                checked={this.props.showDate}
              />
              Show date
            </label>
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={
                  this.props.author ? this.props.author.showAuthorInfo : false
                }
                onChange={this.props.toggleAuthorInfo}
              />
              Show author information
            </label>
          </div>
        </div>
      </div>
    );
  }
}
