import React from 'react';
import {Link} from 'react-router';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      loaded: false
    };
  }
  init(){
    this.props.base.fetch('posts_list', {
      context: this,
      asArray: true,
      queries: {
        orderByChild: 'id'
      },
      then(data){
        if (null != data) {
          this.setState({
            posts: data,
            loaded: true
          });
        }
      }
    });
  }
  componentDidMount(){
    this.init();
  }
  render () {
    var loadingMessage = ""
    if (!this.state.loaded) {
      loadingMessage = <p className='loader'><strong>Loading .....</strong></p>;
    }
    var postList = [];
    var postList = this.state.posts.map((post, i) => {
      return (
        <li key={i} className="list-group-item">{post.title}  <Link className="btn btn-primary" to={"/edit/post/" + post.id}>Edit</Link></li>
      )
    });
    return (
      <div>
        <h2>Config</h2>
        <Link to="/config" className="btn btn-primary">Config List Page</Link>
        <Link to="/config/new" className="btn btn-primary">New Config</Link>
        <h2>Posts</h2>
        <Link to="/post/new" className="btn btn-primary">New Post</Link>
        {loadingMessage}
        <ul className="list-group">
          {postList}
        </ul>
      </div>
    )
  }
}
export default Home;
