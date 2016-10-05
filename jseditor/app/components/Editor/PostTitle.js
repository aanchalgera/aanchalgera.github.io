import React from 'react';
import PropertyButton from './PropertyButton';

class PostTitle extends React.Component{
  render(){
    var foregroundColor = this.props.data.foregroundColor=='#FFF'? 'module-fg-light': 'module-fg-dark';
    var backgroundFullscreen = this.props.data.backgroundFullscreen ? 'fullscreen-background' : '';
    var backgroundImageStyle = {};
    if (this.props.data.backgroundImage) {
      if (this.props.data.backgroundRepeat) {
        backgroundImageStyle = { backgroundImage: 'url(' + this.props.data.backgroundImage + ')', backgroundRepeat: 'repeat' } ;
      } else {
        backgroundImageStyle = { backgroundImage: 'url(' + this.props.data.backgroundImage + ')', backgroundSize: 'cover' } ;
      }
    }
    return (
      <div className="col-sm-12">
        <div className="main-title" data-id='0'>
          <PropertyButton
            data={this.props.data}
            layout={this.props.data.layout}
            dataId='0'
            openResourcePanel={this.props.openResourcePanel}
            addLayoutToResource={this.props.addLayoutToResource}
            addBackgroundOptionToResource={this.props.addBackgroundOptionToResource}
          />
          <div className={'asset-size-' + this.props.data.layout}>
            <div className="col-sm-12 marbot50">
              <div className={this.props.data.backgroundClass + ' ' + foregroundColor} style={backgroundImageStyle}>
                <div className={(this.props.data.backgroundFade == true ? 'module-bg-fade ':'')}>
                  <div className={this.props.data.backgroundFade == true ? 'module-content' : ''}>
                    <textarea
                    placeholder="Title..."
                    className={'form-control form-control-title ' + backgroundFullscreen}
                    value={this.props.value}
                    onChange={this.props.handleChange.bind(this)}
                    onBlur={this.props.handleBlur.bind(this)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostTitle;
