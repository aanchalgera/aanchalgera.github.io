import React from 'react';

class Index extends React.Component{
  render () {
    return (
      <div className="modules">
        <h4 onClick={this.props.onArticleMetaToggle.bind(this)}>
          Index
          <span className="glyphicon glyphicon-plus pull-right" ref={(c) => this._glyphiconClass = c}></span>
        </h4>
        <div className="collapsed-content" ref={(c) => this._articleMetaPanel = c}>
          <div className="form-group">
            <label>Add your html</label>
            <textarea id="index-metadata" defaultValue={this.props.index}
              onBlur={this.props.updateIndexMetadata}
              className="form-control" />
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
