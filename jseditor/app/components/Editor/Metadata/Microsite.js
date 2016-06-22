import React, { PropTypes } from 'react'

class Microsite extends React.Component {
  render () {
    return(
      <div className="modules module-seo">
        <h4>Microsite</h4>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input
            type="text"
            className="form-control"
            defaultValue={this.props.microsite.name}
            onBlur={this.props.updateMicrositeName} />
        </div>
        <div className="form-group">
          <label htmlFor>Google Analytics</label>
          <textarea
            className="form-control"
            placeholder="Add google snippet here...."
            defaultValue={this.props.microsite.gaSnippet}
            onBlur={this.props.updateMicrositeGASnippet} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">
            <input
              type="checkbox"
              className="sponsor-field"
              checked={this.props.microsite.showSocialButtons}
              onChange={this.props.toggleSocialSharing}
            />
            Social Sharing
          </label>
          <label htmlFor="exampleInputEmail1">
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
    )
  }
}

export default Microsite;
