import React from 'react';
import { RouteHandler } from 'react-router';
import Editor from './Editor/Editor';
import TopBar from './Menu/TopBar'

class Main extends React.Component{
  render(){
    return (
      <div className="main-container">
        <TopBar />
        <Editor />
      </div>

    )
  }
};

export default Main;
