import React from 'react';
import { RouteHandler } from 'react-router';
import Editor from './Editor/Editor';

class Main extends React.Component{
  render(){
    return (
      <div className="main-container">
        <nav className="navbar navbar-default" role="navigation">
          <div className="col-sm-7 col-sm-offset-2" style={{marginTop: 15}}>New Post</div>
        </nav>
        <Editor />
      </div>

    )
  }
};

export default Main;
