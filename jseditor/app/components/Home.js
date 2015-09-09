import React from 'react';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      posts: []
    };
  }
  init(){
    this.props.base.fetch('posts', {
      context: this,
      asArray: true,
      then(data){
        if (null != data) {
          this.setState({
            posts: data
          });
        }
      }
    });
  }
  componentDidMount(){
    this.init();
  }
  render () {
    var postList = [];
    var postList = this.state.posts.map((post, i) => {
      return (
        <li key={i} className="list-group-item"><a href={"#/edit/post/" + post.id}>{post.title}</a></li>
      )
    });
    return (
      <div>
      <h2>List Page</h2>
      <a className="btn btn-primary" href="#/post/new">New Post</a>
      <ul className="list-group">
        {postList}
      </ul>
    </div>
    )
  }
}
export default Home;
