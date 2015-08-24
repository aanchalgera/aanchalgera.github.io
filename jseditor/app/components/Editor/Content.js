import React, { PropTypes } from 'react';
import PropertyButton from './PropertyButton';
import MediumEditor from 'medium-editor';

class Content extends React.Component{
  componentDidMount() {
    if ('content' == this.props.type) {
      this.initializeEditor(this.props.index);
      var currentRef = 'myInput' + this.props.id;
      this.refs[currentRef].getDOMNode().focus();
    }
  }
  initializeEditor(editArea) {
	var editor = new MediumEditor('#' + editArea,{
	});
  }
  createMarkup(text) { 
	return {__html: text}; 
  }
  render () {
    var propertyButton = '';
    var showBackgroundImageField = true;
    if('content' == this.props.type) {
      var field = <p
        id={this.props.index}
        ref={'myInput' + Number(this.props.id)}
         className="form-control-static"
	dangerouslySetInnerHTML= {this.createMarkup(this.props.data.text)} 
        onKeyDown={this.props.addNewTextArea.bind(this)}>
      </p>;
    } else if('image' == this.props.type) {
      var field = <img src={this.props.data.url} height={this.props.data.height} width={this.props.data.width} />
      showBackgroundImageField = false;
    }
    return (
      <div className="container-ul-iiner" 
	   draggable="true" 
	   data-id={this.props.id} 
	   onDragEnd={this.props.dragEnd.bind(this)}
           onDragStart={this.props.dragStart.bind(this)}>
        {field}
        <PropertyButton alignment={this.props.data.alignment} fieldClass={showBackgroundImageField ? '' : '.hidden'} />
      </div>
    )
  }
}

Content.propTypes = { type: React.PropTypes.string.isRequired };

export default Content;
