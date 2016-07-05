import React from 'react';

class Index extends React.Component{
  render () {
    return (
      <div className="modules">
        <h4 onClick={this.props.onArticleMetaToggle.bind(this, this.refs)}>
          Index
          <span className="glyphicon glyphicon-plus pull-right" ref='glyphiconClass'></span>
        </h4>
        <div className="collapsed-content" ref='articleMetaPannel'>
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
