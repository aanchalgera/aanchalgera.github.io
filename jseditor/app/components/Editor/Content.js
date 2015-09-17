import React, { PropTypes } from 'react';
import PropertyButton from './PropertyButton';
import Gallery from './Gallery';

class Content extends React.Component{
  componentDidMount() {
    if ('content' == this.props.type) {
      this.initializeEditor(this.props.index);
      var currentRef = 'myInput' + this.props.dataId;
      this.refs[currentRef].getDOMNode().focus();
      document.querySelector('#div-'+this.props.index+' .CodeMirror').setAttribute('style',this.getStyleText(this.props.data));
    }else if ('summary' == this.props.type || 'richContent' == this.props.type) {
      document.querySelector('#div-'+this.props.index+' .form-control').setAttribute('style',this.getStyleText(this.props.data));
    }
  }
  componentDidUpdate() {
    if ('content' == this.props.type) {
      document.querySelector('#div-'+this.props.index+' .CodeMirror').setAttribute('style',this.getStyleText(this.props.data));
    }else if ('summary' == this.props.type || 'richContent' == this.props.type) {
      document.querySelector('#div-'+this.props.index+' .form-control').setAttribute('style',this.getStyleText(this.props.data));
    }
  }
  initializeEditor(editArea) {
    var editor = new SimpleMDE({ element: document.getElementById(editArea),
    spellChecker : false,
    toolbar: ["bold", "italic", "heading", "|", "quote", "ordered-list", "unordered-list", "link"]
  });
    editor.render();
    var dataId = this.props.dataId;
    var updateText = this.props.updateText;
    var id = this.props.data.id;
    var addNewTextArea = this.props.addNewTextArea;
    editor.codemirror.on("blur", function(event){
      updateText(dataId, editor.value())
    });
    editor.codemirror.on("keydown", function(cm, event){
      addNewTextArea(event, id)
    });
  }
  getStyleText(data) {
    var backgroundColor = '', backgroundImage = '';
    if (data.align == '') {
      backgroundColor = data.backgroundColor;
      backgroundImage = "url('"+data.backgroundImage+"')";
    }
    return 'background-color:'+backgroundColor+';background-image:'+backgroundImage;
  }
  getSummary(text) {
    return {__html: '<blockquote>'+text+'</blockquote>'};
  }
  render () {
    if('content' == this.props.type) {
      var field = <textarea
        id={this.props.index}
        ref={'myInput' + Number(this.props.dataId)}
        defaultValue= {this.props.data.text}
        >
      </textarea>;
    }else if ('summary' == this.props.type) {
      var field = <div
        id={this.props.index}
        className="form-control"
        ref={'myInput' + Number(this.props.dataId)}
        dangerouslySetInnerHTML={this.getSummary(this.props.data.text)}
        onBlur = {this.props.updateSummaryText.bind(this, this.props.dataId)}
        contentEditable="true"
        >
      </div>;
    } else if('image' == this.props.type) {
      var field = <img
        id={'img' + this.props.data.id}
        data-id={this.props.dataId}
        src={this.props.data.url}
        height={this.props.data.height}
        width={this.props.data.width}
      />
    }  else if('gallery' == this.props.type) {
      var field = <Gallery
        data={this.props.data}
        dataId={this.props.dataId}
        openResourcePanel={this.props.openResourcePanel.bind(this)}
      />
    } else if('video' == this.props.type) {
      if ('' == this.props.data.url) {
        var field = <input
          type="text"
          className="form-control"
          defaultValue={this.props.data.url}
          onBlur = {this.props.updateVideo.bind(this, this.props.dataId)}>
        </input>
      } else {
        var field = <iframe src={this.props.data.url}></iframe>
      }
    }else if('richContent' == this.props.type) {
      var field = <textarea
        id={this.props.index}
        className="form-control"
        ref={'myInput' + Number(this.props.dataId)}
        defaultValue= {this.props.data.text}
        onBlur = {this.props.updateRichContent.bind(this, this.props.dataId)}
        >
        </textarea>;
    }

  if (this.props.alignError == true) {
    var alignError = <div role="alert" className="alert alert-danger">Left and right column mismatch</div>;
  } else {
    var alignError = '';
  }

    return (
      <div className="container-ul-inner"
       id={"div-"+this.props.index}
       draggable="true"
       data-id={this.props.dataId}
       key={this.props.data.key}
       onDragEnd={this.props.dragEnd.bind(this)}
       onDragStart={this.props.dragStart.bind(this)}>
	       {alignError}
         {field}
         <PropertyButton
           align={this.props.data.align}
           layout={this.props.data.layout}
           type={this.props.type}
           addClassToResource={this.props.addClassToResource}
           addBackgroundOptionToResource={this.props.addBackgroundColorToResource}
           openResourcePanel={this.props.openResourcePanel}
           deleteResource={this.props.deleteResource}
           data={this.props.data}
           dataId={this.props.dataId}
           addLayoutToResource={this.props.addLayoutToResource}
         />
      </div>
    )
  }
}

Content.propTypes = { type: React.PropTypes.string.isRequired };

export default Content;
