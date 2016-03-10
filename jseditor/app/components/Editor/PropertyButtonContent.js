import React from 'react';

class PropertyButtonContent extends React.Component {
  render() {
    var backgroundImageOptions = '';
    if (this.props.data.backgroundImage != '' && this.props.data.backgroundImage != undefined) {
      var backgroundImage=<span className="input-group">
        <input type="text" placeholder={this.props.data.backgroundImageName} className="form-control input-group-sm" style={{width: '50%'}} />
        <span className="input-group-btn">
          <button onClick={this.props.openResourcePanel.bind(this,'backgroundImage',this.props.dataId, '', false)} type="button" className="btn btn-default">
            <span className="glyphicon glyphicon-edit" />
          </button><button onClick={this.props.addBackgroundOptionToResource.bind(this,'removeBackgroundImage', null)} type="button" className="btn btn-default">
          <span className="glyphicon glyphicon-trash" /></button>
        </span>
      </span>
      backgroundImageOptions =
        <li><label> Effects </label>
          <button type='button' onClick={this.props.addBackgroundOptionToResource.bind(this,'parallax', null)} className={"btn btn-default "+(this.props.data.parallax ?  "active" : null)}>Parallax</button>
          <button type='button' onClick={this.props.addBackgroundOptionToResource.bind(this,'backgroundFade', null)} className={"btn btn-default "+(this.props.data.backgroundFade ? "active" : null)}>Fade</button>
          <button type='button' onClick={this.props.addBackgroundOptionToResource.bind(this,'backgroundRepeat', null)} className={"btn btn-default "+(this.props.data.backgroundRepeat ? "active" : null)}>Repeat</button>
          <span className="hint">you can select multiple effects</span>
          <button className="btn btn-default full-bg" type='button' onClick={this.props.addBackgroundOptionToResource.bind(this,'backgroundFullscreen', null)} className={"btn btn-default "+(this.props.data.backgroundFullscreen ?  "active" : null)}>Fullscreen background</button>
        </li>
    } else {
      var backgroundImage = <div className="input-group">
        <button type='button' onClick={this.props.openResourcePanel.bind(this,'backgroundImage',this.props.dataId, '', false)} className="btn btn-default" data-toggle="button" aria-pressed="false" autoComplete="off">Select background image</button>
      </div>
    }
    return (
      <ul className="list-background">
        <h5>Background</h5>
        <li><label> Colour </label>
          <button type='button' onClick={this.props.addBackgroundOptionToResource.bind(this, 'backgroundClass', 'module-bg-color-branded-light')} className={"btn module-bg-color-branded-light "+(this.props.data.backgroundClass=="module-bg-color-branded-light" ?  "active" : null)} />
          <button type='button' onClick={this.props.addBackgroundOptionToResource.bind(this, 'backgroundClass', 'module-bg-color-neutral-dark')} className={"btn module-bg-color-neutral-dark "+(this.props.data.backgroundClass=="module-bg-color-neutral-dark" ?  "active" : null)} />
          <button type='button' onClick={this.props.addBackgroundOptionToResource.bind(this, 'backgroundClass', 'module-bg-color-neutral-light')} className={"btn module-bg-color-neutral-light "+(this.props.data.backgroundClass=="module-bg-color-neutral-light" ?  "active" : null)} />
          <button type='button' onClick={this.props.addBackgroundOptionToResource.bind(this, 'backgroundClass', 'module-bg-color-branded-dark')} className={"btn module-bg-color-branded-dark "+(this.props.data.backgroundClass=="module-bg-color-branded-dark" ?  "active" : null)} />
        </li>
        <li><label> Text </label>
            <button type='button' onClick={this.props.addBackgroundOptionToResource.bind(this, 'foregroundColor', '#FFF')} className={"btn background-white "+(this.props.data.foregroundColor=="#FFF" ?  "active" : null)}></button>
            <button type='button' onClick={this.props.addBackgroundOptionToResource.bind(this, 'foregroundColor', '#000')} className={"btn background-black "+(this.props.data.foregroundColor=="#000" ?  "active" : null)}></button>
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
