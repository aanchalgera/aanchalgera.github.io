import React from 'react';

class TopBar extends React.Component {
  render () {
    return (
      <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
        <div className="brand"><a>New Post</a></div>
      </nav>
    )
  }
}

export default TopBar;
