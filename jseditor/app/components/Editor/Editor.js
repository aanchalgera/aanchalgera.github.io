import React from 'react';
import Content from './Content';
import PropertyButton from './PropertyButton';
import PostTitle from './PostTitle';

class Editor extends React.Component{
  render(){
    return (
      <form id="editor-form">
        <div className="form-group">
          <label className="col-sm-2 control-label">Title</label>
          <PostTitle />
          <label className="col-sm-1 control-label">Content:</label>
          <Content />
          <PropertyButton />
          <button type="submit" className="btn btn-default">Submit</button>
        </div>
      </form>
    )
  }
};

export default Editor;
