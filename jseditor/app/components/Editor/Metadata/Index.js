import React from 'react';

class Index extends React.Component{
  render () {
    return (
        <div className="modules">
          <h4>Index</h4>
          <div className="form-group">
            <label>Add your html</label>
            <textarea id="index-metadata" defaultValue={this.props.index}
              onBlur={this.props.updateIndexMetadata}
              className="form-control" />
          </div>
        </div>
    )
  }
}

export default Index;
