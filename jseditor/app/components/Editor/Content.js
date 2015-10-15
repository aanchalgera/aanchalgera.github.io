import React, { PropTypes } from 'react';
import PropertyButton from './PropertyButton';
import Gallery from './Gallery';

class Content extends React.Component{
  componentDidMount() {
    if ('content' == this.props.data.type) {
      this.initializeEditor(this.props.index);
      var currentRef = 'myInput' + this.props.dataId;
      document.querySelector('#div-'+this.props.index+' .CodeMirror').setAttribute('style',this.props.getStyleText(this.props.data));
      this.refs[currentRef].getDOMNode().focus();
    }else if ('summary' == this.props.data.type || 'richContent' == this.props.data.type) {
      document.querySelector('#div-'+this.props.index+' .form-control').setAttribute('style',this.props.getStyleText(this.props.data));
    }
  }
  componentDidUpdate() {
    if ('content' == this.props.data.type) {
      document.querySelector('#div-'+this.props.index+' .CodeMirror').setAttribute('style',this.props.getStyleText(this.props.data));
    }else if ('summary' == this.props.data.type || 'richContent' == this.props.data.type) {
      document.querySelector('#div-'+this.props.index+' .form-control').setAttribute('style',this.props.getStyleText(this.props.data));
    }
  }
  initializeEditor(editArea) {
    var editor = new SimpleMDE({ element: document.getElementById(editArea),
    spellChecker : false,
    toolbar: ["bold", "italic", "strikethrough", "|", "heading-1", "heading-2", "heading-3", "|", "quote", "ordered-list", "unordered-list", "link"]
  });
    editor.render();
    var dataId = this.props.dataId;
    var updateText = this.props.updateText;
    var id = this.props.data.id;
    var addNewTextArea = this.props.addNewTextArea;
    editor.codemirror.on("blur", function(event){
      updateText(event, editor.value())
    });
    //editor.codemirror.on("keydown", function(cm, event){
    //  addNewTextArea(event, id)
    //});
  }

  getSummary(text) {
    return {__html: text};
  }
  render () {
    if('content' == this.props.data.type) {
      var field = <textarea
        id={this.props.index}
        ref={'myInput' + this.props.dataId}
        defaultValue= {this.props.data.text}
        data-id={this.props.dataId}
        >
      </textarea>;
    }else if ('summary' == this.props.data.type) {
      var field = <div
        id={this.props.index}
        className="form-control blockquote"
        ref={'myInput' + this.props.dataId}
        onBlur = {this.props.updateSummaryText.bind(this, this.props.dataId)}
        contentEditable="true"
        dangerouslySetInnerHTML={this.getSummary(this.props.data.text)}
        >
      </div>;
    } else if('image' == this.props.data.type) {
      var field = <img
        id={'img' + this.props.data.id}
        data-id={this.props.dataId}
        src={this.props.data.url}
        height={this.props.data.height}
        width={this.props.data.width}
      />
  }  else if('gallery' == this.props.data.type) {
      var field = <Gallery
        data={this.props.data}
        dataId={this.props.dataId}
        openResourcePanel={this.props.openResourcePanel.bind(this)}
      />
  } else if('video' == this.props.data.type) {
      if ('' == this.props.data.url) {
        var field = <input
          type="text"
          className="form-control"
          defaultValue={this.props.data.url}
          onBlur = {this.props.updateVideo.bind(this, this.props.dataId)}>
        </input>
      } else {
        var field = <div className="fluid-width-video-wrapper"><iframe src={this.props.data.url}></iframe></div>
      }
    }else if('richContent' == this.props.data.type) {
      var field = <div
        id={this.props.index}
        className="form-control"
        ref={'myInput' + this.props.dataId}
        contentEditable="true"
        onBlur = {this.props.updateRichContent.bind(this, this.props.dataId)}
        >{this.props.data.text}</div>;
    }
    if (this.props.data.backgroundFade == true) {
      var fade = <div className="builder-section-overlay"></div>
    } else {
      var fade = '';
    }
    return (
      <div className={this.props.grouped=='true'?'cloumn-content':"container-ul-inner"}
       id={"div-"+this.props.index}
       data-id={this.props.dataId}
       key={this.props.data.key}>
         {field}
         {fade}
         <PropertyButton
           align={this.props.data.align}
           layout={this.props.data.layout}
           addBackgroundOptionToResource={this.props.addBackgroundOptionToResource}
           openResourcePanel={this.props.openResourcePanel}
           deleteResource={this.props.deleteResource}
           data={this.props.data}
           dataId={this.props.dataId}
           addLayoutToResource={this.props.addLayoutToResource}
           ungroupSections={this.props.ungroupSections}
           grouped={this.props.grouped}
         />
      </div>
    )
  }
}

export default Content;
