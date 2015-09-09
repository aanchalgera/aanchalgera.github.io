import React, { PropTypes } from 'react';
import PropertyButton from './PropertyButton';
import MediumEditor from 'medium-editor';

class Content extends React.Component{
  componentDidMount() {
    if ('content' == this.props.type) {
      this.initializeEditor(this.props.index);
      var currentRef = 'myInput' + this.props.dataId;
      this.refs[currentRef].getDOMNode().focus();
    }
  }
  initializeEditor(editArea) {
    var editor = new MediumEditor('#' + editArea,
      {
        imageDragging: false,
        autoLink: true,
        toolbar: {
          buttons: [
            'bold', 'italic', 'underline', 'h1', 'h2'
            , 'unorderedlist', 'orderedlist', 'anchor'
            , 'justifyLeft', 'justifyCenter', 'justifyRight'
          ]
        }
      });
  }
  createMarkup(text) {
    return {__html: text};
  }
  render () {
    var backgroundColor = '', backgroundImage = '';
    if('content' == this.props.type) {
      if (this.props.data.align == '') {
        if (this.props.data.backgroundColor != '') {
          backgroundColor = this.props.data.backgroundColor;
        }
        if (this.props.data.backgroundImage != null) {
          backgroundImage = "url('"+this.props.data.backgroundImage+"')";
        }
      }
      var style =  {
  	     backgroundColor:backgroundColor,
         backgroundImage:backgroundImage
      }
      var field = <p
        id={this.props.index}
        style={style}
        data-id={this.props.dataId}
        ref={'myInput' + Number(this.props.dataId)}
        className="form-control-static"
        dangerouslySetInnerHTML= {this.createMarkup(this.props.data.text)}
        onKeyDown={this.props.addNewTextArea.bind(this)}
        onBlur={this.props.updateText.bind(this)}>
      </p>;
    } else if('image' == this.props.type) {
      var field = <img
        id={'img' + this.props.data.id}
        data-id={this.props.dataId}
        src={this.props.data.url}
        height={this.props.data.height}
        width={this.props.data.width}
      />
    }
    if (this.props.alignError == true) {
      var alignError = <div role="alert" className="alert alert-danger">Left and right column mismatch</div>;
    } else {
      var alignError = '';
    }
    var alignClass = "";
    switch (this.props.data.align) {
      case 'left':
        alignClass = 'section-align-left';
        break;
        case 'right':
          alignClass = 'section-align-right';
          break;
      default:
        alignClass = '';
    }
    return (
      <div className={"container-ul-inner " + alignClass}
       draggable="true"
       data-id={this.props.dataId}
       key={this.props.data.key}
       onDragEnd={this.props.dragEnd.bind(this)}
       onDragStart={this.props.dragStart.bind(this)}>
	       {alignError}
         {field}
         <PropertyButton
           align={this.props.data.align}
	         type={this.props.type}
           addClassToResource={this.props.addClassToResource}
           addBackgroundColorToResource={this.props.addBackgroundColorToResource}
           openResourcePanel={this.props.openResourcePanel}
           deleteResource={this.props.deleteResource}
         />
      </div>
    )
  }
}

Content.propTypes = { type: React.PropTypes.string.isRequired };

export default Content;
