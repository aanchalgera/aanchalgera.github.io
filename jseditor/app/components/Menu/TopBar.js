import React from 'react';

class TopBar extends React.Component {
  render () {
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="col-sm-7 col-sm-offset-2" style={{marginTop: 15}}>New Post</div>
      </nav>
    )
  }
}

export default TopBar;
