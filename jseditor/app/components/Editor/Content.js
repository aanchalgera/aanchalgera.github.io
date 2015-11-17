import React from 'react';
import PropertyButton from './PropertyButton';
import Image from './Image';
import Gallery from './Gallery';
import Slider from './Slider';

class Content extends React.Component{
  componentDidMount() {
    switch (this.props.data.type) {
      case 'content':
        this.initializeEditor(this.props.index);
        var currentRef = 'myInput' + this.props.dataId;
        document.querySelector('#div-'+this.props.index).setAttribute('style',this.props.getStyleText(this.props.data));
        this.refs[currentRef].getDOMNode().focus();
        break;
      case 'richContent':
      case 'image':
      case 'video':
      case 'gallery':
      case 'slider':
        document.querySelector('#div-'+this.props.index).setAttribute('style',this.props.getStyleText(this.props.data));
        break;
      case 'summary':
        document.querySelector('#div-'+this.props.index+' .blockquote').setAttribute('style',this.props.getStyleText(this.props.data));
      break;
    }
  }
  componentDidUpdate() {
    switch (this.props.data.type) {
    case 'content':
    case 'richContent':
    case 'image':
    case 'video':
    case 'gallery':
    case 'slider':
      document.querySelector('#div-'+this.props.index).setAttribute('style',this.props.getStyleText(this.props.data));
      break;
    case 'summary':
      document.querySelector('#div-'+this.props.index+' .blockquote').setAttribute('style',this.props.getStyleText(this.props.data));
    break;
    }
  }
  initializeEditor(editArea) {
    var editor = new SimpleMDE({ element: document.getElementById(editArea),
    spellChecker : false,
    toolbar: ["bold", "italic", "strikethrough", "|", "heading-1", "heading-2", "heading-3", "|", "quote", "ordered-list", "unordered-list", "link"]
  });
    editor.render();
    var updateText = this.props.updateText;
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
      var field = <Image {...this.props} />
  }  else if('gallery' == this.props.data.type) {
      var field = <Gallery
        data={this.props.data}
        dataId={this.props.dataId}
        openResourcePanel={this.props.openResourcePanel.bind(this)}
        addImageCaption={this.props.addImageCaption.bind(this)}
      />
  }  else if('slider' == this.props.data.type) {
        var field = <Slider
          data={this.props.data}
          dataId={this.props.dataId}
          openResourcePanel={this.props.openResourcePanel.bind(this)}
          addImageCaption={this.props.addImageCaption.bind(this)}
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

    var minimized = (this.props.orderMode && this.props.minimize) ? 'minimised' : '';
    var backgroundClass = this.props.data.backgroundClass ? this.props.data.backgroundClass : '';
    return (
      <div className={(this.props.grouped=='true'?'cloumn-content ':"container-ul-inner ")+minimized+" "+backgroundClass}
       id={"div-"+this.props.index}
       data-id={this.props.dataId}
       key={this.props.data.key}>
         <div className={this.props.data.backgroundFade == true ? "module-bg-fade "+(this.props.data.foregroundColor=='#FFF'? 'module-fg-light': ''): ''}>
           <div className={this.props.data.backgroundFade == true ? "module-content" : ''}>
           {field}
         </div></div>
         <PropertyButton
           align={this.props.data.align}
           layout={this.props.data.layout}
           autoplay={this.props.data.autoplay}
           setAutoPlaySlider={this.props.setAutoPlaySlider}
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
