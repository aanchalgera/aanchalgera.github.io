import React from 'react';
import TopBar from './Menu/TopBar';
import Rebase from 're-base';

var base = Rebase.createClass(configParams.firebaseUrl);

class Main extends React.Component{
  render(){
      Rollbar.info("User Navigation Info", {path: this.props.pathname});
      return (
        <div className="main-container">
          <TopBar />
          <div className="col-sm-12 main">
            <div className="container-fluid">
              <div className="row">
                {React.cloneElement(this.props.children, { base: base })}
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default Main;
