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
          buttons: ['bold', 'italic', 'underline','h1','h2','unorderedlist','orderedlist','anchor','removeFormat', 'justifyLeft','justifyCenter', 'justifyRight']
        }
      });
  }
  createMarkup(text) {
    return {__html: text};
  }
  render () {
    if('content' == this.props.type) {
      var field = <p
        id={this.props.index}
        data-id={this.props.dataId}
        ref={'myInput' + Number(this.props.dataId)}
        className="form-control-static"
        dangerouslySetInnerHTML= {this.createMarkup(this.props.data.text)}
        onKeyDown={this.props.addNewTextArea.bind(this)}>
      </p>;
    } else if('image' == this.props.type) {
      var field = <img
        data-id={this.props.dataId}
        src={this.props.data.url}
        height={this.props.data.height}
        width={this.props.data.width}
      />
      showBackgroundImageField = false;
    }
    var classes = 'container-ul-iiner '+ this.props.data.alignment
    return (
      <div className="container-ul-iiner"
       draggable="true"
       data-id={this.props.dataId}
       key={this.props.data.key}
       onDragEnd={this.props.dragEnd.bind(this)}
       onDragStart={this.props.dragStart.bind(this)}>
         {field}
        <PropertyButton 
	alignment={this.props.data.alignment} 
	addClassToResource={this.props.addClassToResource.bind(this)}
	/>
      </div>
    )
  }
}

Content.propTypes = { type: React.PropTypes.string.isRequired };

export default Content;
