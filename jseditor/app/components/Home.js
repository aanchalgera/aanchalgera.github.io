import React from 'react';
import {Link} from 'react-router';

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
        <li key={i} className="list-group-item">{post.title}  <Link className="btn btn-primary" to={"/edit/post/" + post.id}>Edit</Link></li>
      )
    });
    return (
      <div>
      <h2>List Page</h2>
      <Link to="/post/new" className="btn btn-primary">New Post</Link>
      <br />
      <br />
      <ul className="list-group">
        {postList}
      </ul>
    </div>
    )
  }
}
export default Home;
