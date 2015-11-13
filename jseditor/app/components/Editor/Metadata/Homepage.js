import React from 'react';

class Homepage extends React.Component{
  render () {
    if (this.props.homepage.image == '') {
      var image = <div className="homepage-image-container">
      <button className="btn" onClick={this.props.openResourcePanel.bind(this,'homepage','homepage','',false)}>Choose from gallery</button>
      </div>
    } else {
      var image =<div className="homepage-image-container">
          <a href={this.props.homepage.image.url} target="_blank">{this.props.homepage.image.name}</a>
          <div aria-label="Extra-small button group" role="group" className="btn-group btn-group-xs pull-right">
            <button className="btn btn-default" type="button" title="Change Image"><span className="glyphicon glyphicon-edit" /></button>
            <button className="btn btn-default" type="button" title="Remove Image"><span className="glyphicon glyphicon-remove" /></button>
          </div>
          <img alt src={this.props.homepage.image.url} />
        </div>
    }
    return (
      <div className="modules module-home">
        <h4>Homepage Content</h4>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Add image</label>
          {image}
        </div>
        <div className="form-group">
          <label htmlFor>Add text <span className="hint">(Optional)</span></label>
          <textarea
            className="form-control"
            defaultValue= {this.props.homepage.content}
            placeholder="Add your text here...."
            onBlur={this.props.updateHomepageContent} />
        </div>
        <div className="form-group">
          <label htmlFor>Sponsor name</label>
          <input
            type="text"
            className="form-control sponsor-field"
            defaultValue= {this.props.homepage.sponsor}
            onBlur={this.props.updateHomepageSponsor} />
        </div>
      </div>
    )
  }
}

export default Homepage;
