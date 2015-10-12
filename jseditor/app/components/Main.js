import React from 'react';
import { RouteHandler } from 'react-router';
import Editor from './Editor/Editor';
import Publish from './Editor/Publish';
import TopBar from './Menu/TopBar';
import Rebase from 're-base';

var base = Rebase.createClass("https://flickering-fire-6653.firebaseio.com/");

class Main extends React.Component{
  render(){
    return (
      <div className="main-container">
        <TopBar />
        <div className="col-sm-12 main">
          <div className="container-fluid">
            <div className="row">
              <RouteHandler base={base} {...this.props}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default Main;
