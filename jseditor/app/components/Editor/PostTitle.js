import React from 'react';
import PropertyButton from './PropertyButton';

class PostTitle extends React.Component{
  render(){
    var foregroundColor = this.props.data.foregroundColor=='#FFF'? 'module-fg-light': '';
    return (
      <div className="main-title" data-id={this.props.data.id}>
        <PropertyButton
          data={this.props.data}
          layout={this.props.data.layout}
          dataId={this.props.data.id}
          openResourcePanel={this.props.openResourcePanel}
          addLayoutToResource={this.props.addLayoutToResource}
          addBackgroundOptionToResource={this.props.addBackgroundOptionToResource}
        />
        <label className="col-sm-12 control-label">Title</label>
        <div className="col-sm-12 marbot50">
          <input type="text" className={'form-control ' + this.props.data.backgroundClass + ' ' + foregroundColor} value={this.props.value} onChange={this.props.handleChange.bind(this)} onBlur={this.props.handleBlur.bind(this)} />
        </div>
      </div>
    );
  }
}

export default PostTitle;
