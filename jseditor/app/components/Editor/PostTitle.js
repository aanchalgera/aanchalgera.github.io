import React from 'react'

class PostTitle extends React.Component{
  render(){
    return (
      <div className="col-sm-10 marbot20">
        <input type="text" className="form-control" value={this.props.value} onChange={this.props.handleChange.bind(this)} />
      </div>
    );
  }
}

export default PostTitle;
