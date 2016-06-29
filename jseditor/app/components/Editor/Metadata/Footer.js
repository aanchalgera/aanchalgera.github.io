import React from 'react';

class Footer extends React.Component{
  render () {
    return (
      <div className="modules">
        <h4>Footer Credits</h4>
        <div className="form-group">
          <label>Add your html</label>
          <textarea id="index-metadata" defaultValue={this.props.footer}
            onBlur={this.props.updateFooterCredits}
            className="form-control" />
        </div>
      </div>
    );
  }
}

export default Footer;
