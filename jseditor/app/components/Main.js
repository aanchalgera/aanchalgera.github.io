import React from 'react';
import { RouteHandler } from 'react-router';
import TopBar from './Menu/TopBar';
import Rebase from 're-base';

var base = Rebase.createClass("https://brilliant-heat-3614.firebaseio.com/");

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
