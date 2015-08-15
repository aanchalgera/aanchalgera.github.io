import React, { PropTypes } from 'react';
import PropertyButton from './PropertyButton';

class Content extends React.Component{
  componentDidMount() {
    this.intializeEditor(this.props.index);
    var currentRef = 'myInput' + this.props.dataId;
    this.refs[currentRef].getDOMNode().focus();
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
    return (
      <span>
        <p id={this.props.index} ref={'myInput' + Number(this.props.dataId)} data-id={this.props.dataId} className="form-control-static" onKeyDown={this.props.addNewTextArea.bind(this)}>
          {this.props.text}
        </p>
        <PropertyButton />
      </span>
    )
  }
}

Content.propTypes = { text: React.PropTypes.string.isRequired };

export default Content
