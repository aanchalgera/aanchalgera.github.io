import React from 'react';

class Footer extends React.Component{
  render () {
    return (
      <div className="modules">
        <h4 onClick={this.props.onArticleMetaToggle.bind(this, this.refs)}>
          Footer Credits
          <span className="glyphicon glyphicon-plus pull-right" ref={(c) => this._glyphiconClass = c}></span>
        </h4>
        <div className="collapsed-content" ref={(c) => this._articleMetaPanel = c}>
          <div className="form-group">
            <label>Add your html</label>
            <textarea id="index-metadata" defaultValue={this.props.footer}
              onBlur={this.props.updateFooterCredits}
              className="form-control" />
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
