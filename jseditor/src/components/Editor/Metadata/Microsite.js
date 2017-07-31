import React from 'react';

class Microsite extends React.Component {
  render () {
    return(
      <div className="modules module-home">
        <h4 onClick={this.props.onArticleMetaToggle.bind(this)}>
          Microsite
          <span className="glyphicon glyphicon-plus pull-right" ref={(c) => this._glyphiconClass = c}></span>
        </h4>
        <div className="collapsed-content" ref={(c) => this._articleMetaPanel = c}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              defaultValue={this.props.microsite.name}
              onBlur={this.props.updateMicrositeName} />
          </div>
          <div className="form-group">
            <label>Google Analytics</label>
            <textarea
              className="form-control"
              placeholder="Add google snippet here...."
              defaultValue={this.props.microsite.gaSnippet}
              onBlur={this.props.updateMicrositeGASnippet} />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                className="sponsor-field"
                checked={this.props.microsite.showSocialButtons}
                onChange={this.props.toggleSocialSharing}
              />
              Social Sharing
            </label>
            <label>
              <input
                type="checkbox"
                className="sponsor-field"
                checked={this.props.microsite.showWSLLogo}
                onChange={this.props.toggleWSLLogo}
              />
              WSL Logo
            </label>
          </div>
          <div className="form-group">
            <label>Cookie Page URL</label>
            <input
              type="text"
              className="form-control"
              defaultValue={this.props.microsite.cookiePage}
              onBlur={this.props.updateMicrositeCookiePage} />
          </div>
        </div>
      </div>
    );
  }
}

export default Microsite;
