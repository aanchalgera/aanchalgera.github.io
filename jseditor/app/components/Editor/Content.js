import React from 'react';

class Content extends React.Component{
  handleDoubleClick(e) {
    var keyCount = 0;
    if (e.keyCode == 13) {
    }
  }
  render(){
    return (
        <textarea className="form-control" rows="3" onKeyDown={this.handleDoubleClick} />
    )
  }
};

export default Content;