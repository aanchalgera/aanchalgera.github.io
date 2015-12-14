import React from 'react';

class Homepage extends React.Component{
  componentDidMount() {
    this.initializeEditor();
  }
  initializeEditor() {
    var editor = new SimpleMDE({ element: document.getElementById('homepage-content'),
      spellChecker : false,
      toolbar: ["bold", "italic", "strikethrough", "|", "heading-1", "heading-2", "heading-3", "|", "quote", "ordered-list", "unordered-list", "link"]
    });
    editor.render();
    var updateHomepageContent = this.props.updateHomepageContent;
    editor.codemirror.on("blur", function(event){
      updateHomepageContent(editor.value());
    });
  }
  updateSponsorImage() {
    let sponsorImageUrl = this.refs.sponsorImage.getDOMNode().value;
    if('' != sponsorImageUrl) {
      var isValidUrl = this.checkURL(sponsorImageUrl);
      if (isValidUrl) {
        this.props.updateSponsorImage(sponsorImageUrl);
      }
    }
  }
  checkURL(url) {
      return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }
  render () {
    if (this.props.homepage.image == '' || this.props.homepage.image == undefined) {
      var image = <div className="homepage-image-container">
      <label htmlFor="exampleInputEmail1">Add image</label>
      <button className="btn" onClick={this.props.openResourcePanel.bind(this,'homepage','homepage','',false)}>Choose from gallery</button>
      </div>
    } else {
      var image =<div className="homepage-image-container">
          <a href={this.props.homepage.image.url} target="_blank">{this.props.homepage.image.name}</a>
          <div aria-label="Extra-small button group" role="group" className="btn-group btn-group-xs pull-right">
            <button className="btn btn-default" type="button" title="Change Image" onClick={this.props.openResourcePanel.bind(this,'homepage','homepage','',false)}><span className="glyphicon glyphicon-edit" /></button>
            <button className="btn btn-default" type="button" title="Remove Image" onClick={this.props.deleteHomepageImage}><span className="glyphicon glyphicon-remove" /></button>
          </div>
          <img alt src={this.props.homepage.image.url} />
        </div>
    }
    return (
      <div className="modules module-home">
        <h4>Homepage Content</h4>
        <div className="form-group">
          {image}
        </div>
        <div className="form-group">
          <label htmlFor>Add text <span className="hint">(Optional)</span></label>
          <textarea
            ref = "homepageContent"
            id = "homepage-content"
            className="form-control"
            defaultValue= {this.props.homepage.content}
            placeholder="Add your text here...." />
        </div>
        <div className="form-group">
          <label htmlFor>Sponsor name</label>
          <input
            type="text"
            className="form-control sponsor-field"
            defaultValue= {this.props.homepage.sponsor.name != undefined ? this.props.homepage.sponsor.name : ''}
            onBlur={this.props.updateHomepageSponsor} />
        </div>
        <div className="form-group">
          <label htmlFor>Sponsor image</label>
          <input
            placeholder="Add image url here.."
            ref="sponsorImage"
            type="text"
            className="form-control sponsor-field"
            defaultValue= {this.props.homepage.sponsor.image != undefined ? this.props.homepage.sponsor.image : ''}
            onBlur={this.updateSponsorImage.bind(this)} />
        </div>
      </div>
    )
  }
}

export default Homepage;
