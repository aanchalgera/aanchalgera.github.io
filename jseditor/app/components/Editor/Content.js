import React, { PropTypes } from 'react';
import PropertyButton from './PropertyButton';

class Content extends React.Component{
  componentDidMount() {
    if ('content' == this.props.type) {
      this.intializeEditor(this.props.index);
      var currentRef = 'myInput' + this.props.dataId;
      this.refs[currentRef].getDOMNode().focus();
    }
  }
  intializeEditor(editArea) {
    AlloyEditor.editable(editArea,{
     toolbars : {
       add: {
         buttons: ['quote', 'strike']
       },
       styles : {
         selections: [{
           name: 'text',
           buttons: ['styles', 'bold', 'italic', 'underline', 'link'],
           test: AlloyEditor.SelectionTest.text
         }]
       }
     }
    });
  }
  render () {
    var propertyButton = '';
    var showBackgroundImageField = true;
    if('content' == this.props.type) {
      var field = <p
        id={this.props.index}
        key={this.props.data.key}
        ref={'myInput' + Number(this.props.dataId)}
        data-id={this.props.dataId} className="form-control-static"
        onKeyDown={this.props.addNewTextArea.bind(this)}>
        {this.props.data.text}
      </p>;
    } else if('image' == this.props.type) {
      var field = <p key={this.props.data.id}>
          <img src={this.props.data.src} height={this.props.data.height} width={this.props.data.width} />
        </p>;
      showBackgroundImageField = false;
    }
    return (
      <div className="container-ul-iiner"
	     data-id={this.props.id}
	     draggable="true"
	     onDragEnd={this.props.dragEnd.bind(this)}
       onDragStart={this.props.dragStart.bind(this)}>
        {field}
        <PropertyButton fieldClass={showBackgroundImageField ? '' : '.hidden'} />
      </div>
    )
  }
}

Content.propTypes = { type: React.PropTypes.string.isRequired };

export default Content;
