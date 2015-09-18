import React from 'react';

class PropertyButtonContent extends React.Component {
  render() {
    var whiteBackgroundColor = '', backgroundImageOptions = '';
    if (this.props.data.backgroundColor != '' &&  this.props.data.backgroundColor != '#FFF') {
      whiteBackgroundColor = <button onClick={this.props.addBackgroundOptionToResource.bind(this, 'backgroundColor', '#000')} className="btn background-white" />
    }
    if (this.props.data.backgroundImage != '') {
      backgroundImageOptions =
        <li><label> Effects </label>
          <button onClick={this.props.addBackgroundOptionToResource.bind(this,'parallax', null)} className={"btn btn-default "+(this.props.data.parallax ?  "active" : null)}>Parallax</button>
          <button onClick={this.props.addBackgroundOptionToResource.bind(this,'backgroundFade', null)} className={"btn btn-default "+(this.props.data.backgroundFade ? "active" : null)}>Fade</button>
          <button onClick={this.props.addBackgroundOptionToResource.bind(this,'backgroundRepeat', null)} className={"btn btn-default "+(this.props.data.backgroundRepeat ? "active" : null)}>Repeat</button>
          <span className="hint">you can select multiple effects</span>
        </li>
    }
    return (
      <ul className="list-background">
        <h5>Background</h5>
        <li><label> Colour </label>
          {whiteBackgroundColor}
          <button onClick={this.props.addBackgroundOptionToResource.bind(this, 'backgroundColor', '#000')} className="btn background-black" />
          <button onClick={this.props.addBackgroundOptionToResource.bind(this, 'backgroundColor', '#4b8a20')} className="btn background-green" />
          <button onClick={this.props.addBackgroundOptionToResource.bind(this, 'backgroundColor', '#d8022a')} className="btn background-red" />
        </li>
        <li><label> Image </label>
          <div className="input-group">
            <button onClick={this.props.openResourcePanel.bind(this,'backgroundImage',this.props.dataId, 'hidden', false)} className="btn btn-default" data-toggle="button" aria-pressed="false" autoComplete="off">Select background image</button>
          </div>
        </li>
        {backgroundImageOptions}
      </ul>
  )
  }
}

export default PropertyButtonContent;
