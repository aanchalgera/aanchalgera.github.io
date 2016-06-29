import React from 'react';

class PostTitle extends React.Component{
  render(){
    return (
      <div className="col-sm-12 marbot50">
        <input type="text" className="form-control" value={this.props.value} onChange={this.props.handleChange.bind(this)} onBlur={this.props.handleBlur.bind(this)} />
      </div>
    );
  }
}

export default PostTitle;
