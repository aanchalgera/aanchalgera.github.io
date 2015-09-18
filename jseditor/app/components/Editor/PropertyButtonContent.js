import React from 'react';

class PropertyButtonContent extends React.Component {
  render() {
    var whiteBackgroundColor = '', backgroundImageOptions = '';
    if (this.props.data.backgroundColor != '' &&  this.props.data.backgroundColor != '#FFF') {
      whiteBackgroundColor = <button onClick={this.props.addBackgroundOptionToResource.bind(this, 'backgroundColor', '#FFF')} className={"btn background-white "+(this.props.data.backgroundColor=="#FFF" ?  "active" : null)} />
    }
    if (this.props.data.backgroundImage != '') {
      var backgroundImage=<span className="input-group">
        <input type="text" placeholder={this.props.data.backgroundImageName} className="form-control input-group-sm" style={{width: '50%'}} />
        <span className="input-group-btn">
          <button onClick={this.props.openResourcePanel.bind(this,'backgroundImage',this.props.dataId, 'hidden', false)} type="button" className="btn btn-default">
            <span className="glyphicon glyphicon-edit" />
          </button><button onClick={this.props.addBackgroundOptionToResource.bind(this,'removeBackgroundImage', null)} type="button" className="btn btn-default">
          <span className="glyphicon glyphicon-trash" /></button>
        </span>
      </span>
      backgroundImageOptions =
        <li><label> Effects </label>
          <button onClick={this.props.addBackgroundOptionToResource.bind(this,'parallax', null)} className={"btn btn-default "+(this.props.data.parallax ?  "active" : null)}>Parallax</button>
          <button onClick={this.props.addBackgroundOptionToResource.bind(this,'backgroundFade', null)} className={"btn btn-default "+(this.props.data.backgroundFade ? "active" : null)}>Fade</button>
          <button onClick={this.props.addBackgroundOptionToResource.bind(this,'backgroundRepeat', null)} className={"btn btn-default "+(this.props.data.backgroundRepeat ? "active" : null)}>Repeat</button>
          <span className="hint">you can select multiple effects</span>
        </li>
    } else {
      var backgroundImage = <div className="input-group">
        <button onClick={this.props.openResourcePanel.bind(this,'backgroundImage',this.props.dataId, 'hidden', false)} className="btn btn-default" data-toggle="button" aria-pressed="false" autoComplete="off">Select background image</button>
      </div>
    }
    return (
      <ul className="list-background">
        <h5>Background</h5>
        <li><label> Colour </label>
          {whiteBackgroundColor}
          <button onClick={this.props.addBackgroundOptionToResource.bind(this, 'backgroundColor', '#000')} className={"btn background-black "+(this.props.data.backgroundColor=="#000" ?  "active" : null)} />
          <button onClick={this.props.addBackgroundOptionToResource.bind(this, 'backgroundColor', '#4b8a20')} className={"btn background-green "+(this.props.data.backgroundColor=="#4b8a20" ?  "active" : null)} />
          <button onClick={this.props.addBackgroundOptionToResource.bind(this, 'backgroundColor', '#d8022a')} className={"btn background-red "+(this.props.data.backgroundColor=="#d8022a" ?  "active" : null)} />
        </li>
        <li><label> Text </label>
            <button onClick={this.props.addBackgroundOptionToResource.bind(this, 'foregroundColor', '#FFF')} className={"btn background-white "+(this.props.data.foregroundColor=="#FFF" ?  "active" : null)}></button>
            <button onClick={this.props.addBackgroundOptionToResource.bind(this, 'foregroundColor', '#000')} className={"btn background-black "+(this.props.data.foregroundColor=="#000" ?  "active" : null)}></button>
        </li>
        <li><label> Image </label>
          {backgroundImage}
        </li>
        {backgroundImageOptions}
      </ul>
  )
  }
}

export default PropertyButtonContent;
