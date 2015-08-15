import React from 'react';
import ContentList from './ContentList';
import PropertyButton from './PropertyButton';
import PostTitle from './PostTitle';

var map = [];

class Editor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fields: [""]
    };
  }
  addNewTextArea(event) {
    map[event.keyCode] = event.type == 'keydown';
    if (map[91] && map[13]) {
      var currentIndex = Number(event.target.dataset.id);
      this.state.fields.splice(currentIndex+1,0,"");
      this.setState({fields: this.state.fields});
      map = [];
    }
  }
  render(){
    return (
      <form id="editor-form">
        <div className="form-group">
          <label className="col-sm-2 control-label">Title</label>
          <PostTitle />
          <label className="col-sm-2 control-label">Content:</label>
	  <ContentList fields={this.state.fields} addNewTextArea={this.addNewTextArea.bind(this)} />
        </div>
        <div className="submit-area"><button className="btn btn-primary">Submit</button></div>
      </form>
    )
  }
};

export default Editor;
