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
        ref={'myInput' + Number(this.props.dataId)}
        data-id={this.props.dataId} className="form-control-static"
        onKeyDown={this.props.addNewTextArea.bind(this)}>
        {this.props.data.text}
      </p>;
    } else if('image' == this.props.type) {
      var field = <p 
        ref={'myInput' + Number(this.props.dataId)}
        data-id={this.props.dataId}>
          <img src={this.props.data.url} height={this.props.data.height} width={this.props.data.width} />
        </p>;
      showBackgroundImageField = false;
    }
    return (
      <span>
        {field}
        <PropertyButton fieldClass={showBackgroundImageField ? '' : '.hidden'} />
      </span>
    )
  }
}

Content.propTypes = { type: React.PropTypes.string.isRequired };

export default Content
