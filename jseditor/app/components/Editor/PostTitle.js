import React from 'react';
import PropertyButton from './PropertyButton';

class PostTitle extends React.Component{
  render(){
    var foregroundColor = this.props.data.foregroundColor=='#FFF'? 'module-fg-light': '';
    var backgroundFullscreen = this.props.data.backgroundFullscreen ? 'fullscreen-background' : ''; 
    var backgroundImageStyle = {};
    if (this.props.data.backgroundImage) {
      backgroundImageStyle = { backgroundImage: 'url(' + this.props.data.backgroundImage + ')', backgroundSize: 'cover' } ;
    }
    return (
      <div className="col-sm-12">
        <div className="main-title" data-id='0'>
          <PropertyButton
            data={this.props.data}
            layout={this.props.data.layout}
            dataId={this.props.data.id}
            openResourcePanel={this.props.openResourcePanel}
            addLayoutToResource={this.props.addLayoutToResource}
            addBackgroundOptionToResource={this.props.addBackgroundOptionToResource}
          />
          <div className={'asset-size-' + this.props.data.layout}>
            <div className="col-sm-12 marbot50">
              <textarea
                placeholder="Title..."
                className={'form-control form-control-title ' + this.props.data.backgroundClass + ' ' + foregroundColor + ' ' + backgroundFullscreen}
                style={backgroundImageStyle}
                value={this.props.value}
                onChange={this.props.handleChange.bind(this)}
                onBlur={this.props.handleBlur.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostTitle;
