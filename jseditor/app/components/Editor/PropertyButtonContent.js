import React from 'react';

class PropertyButtonContent extends React.Component {
  render() {
    var whiteBackgroundColor = '', backgroundImageOptions = '';
    if (this.props.data.backgroundColor != '' &&  this.props.data.backgroundColor != '#FFF') {
      whiteBackgroundColor = <li data-color="#FFF" onClick={this.props.addBackgroundOptionToResource.bind(this, 'backgroundColor', '#FFF')} className="background-white">White</li>
    }
    if (this.props.data.backgroundImage != '') {
      backgroundImageOptions = <ul>
      <li><a href="#" className={this.props.data.parallax ? "active" : null } onClick={this.props.addBackgroundOptionToResource.bind(this,'parallax', null)}> Add Parallax</a></li>
      <li><a href="#" className={this.props.data.backgroundRepeat ? "active" : null } onClick={this.props.addBackgroundOptionToResource.bind(this,'backgroundRepeat', null)}> Background Repeat </a></li>
      <li><a href="#" className={this.props.data.backgroundCover ? "active" : null } onClick={this.props.addBackgroundOptionToResource.bind(this,'backgroundCover', null)}>Background Cover</a></li>
      </ul>
    }
    return (
      <span className="btn-group dropdown" role="group">
        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Background
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
            <li onClick={this.props.openResourcePanel.bind(this,'backgroundImage',this.props.dataId)}><a>Background Image</a></li>
            {backgroundImageOptions}
            <li className="divider" role="separator"></li>
            <li><a>Background Colour</a></li>
            <li data-color="#000" onClick={this.props.addBackgroundOptionToResource.bind(this, 'backgroundColor', '#000')} className="background-black">color</li>
            <li data-color="#4b8a20" onClick={this.props.addBackgroundOptionToResource.bind(this, 'backgroundColor', '#4b8a20')} className="background-green">color</li>
            <li data-color="#d8022a" onClick={this.props.addBackgroundOptionToResource.bind(this, 'backgroundColor', '#d8022a')} className="background-red">color</li>
            {whiteBackgroundColor}
        </ul>
      </span>
  )
  }
}

export default PropertyButtonContent;
