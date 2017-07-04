import React from 'react';
import Snackbar from 'material-ui/Snackbar';

import RepostBlogsOptions from '../components/Editor/DraftJSEditor/RepostBlogsOptions';

const styles = {
  bodyContent: {
    padding: '24px',
  }
};

class Difundir extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      postRepostBlogNames: [],
      postDate: '',
      publishRegion: [],
      blogName: '',
      snackbarOpen: false
    };
  }

  componentDidMount() {
    this.init();
  }

  componentWillMount() {
    this.checkUser();
  }

  checkUser() {
    const {
      match: { params: { postname } },
      location: { search },
      history
    } = this.props;

    const query = new URLSearchParams(search);

    this.userId = query.get('userid');
    this.blogName = query.get('blog');
    let regEx = /\D/;
    if (regEx.test(this.userId)) {
      history.push('/invalidUser');
    }
    this.postname = postname;
  }

  init() {
    const { history } = this.props;

    if (this.blogName == undefined) {
      history.replace('/invalidBlog');
    } else {
      this.props.base.fetch('config', {
        context: this,
        asArray: true,
        queries: {
          orderByChild: 'site_name',
          equalTo: this.blogName
        },
        then(data) {
          if (data[0] != null) {
            this.setState({
              blogName: this.blogName,
              blogUrl: data[0].site_url
            });
          } else {
            history.replace('/invalidBlog');
          }
        }
      });
    }

    if (this.postname != undefined) {
      this.props.base.fetch('posts/' + this.postname, {
        context: this,
        then(data) {
          if (data.hasOwnProperty('id')) {
            this.setState({
              id: data.id,
              postRepostBlogNames: data.publishData.postRepostBlogNames || [],
              publishRegion: data.publishData.publishRegion || '',
              postDate: data.publishData.postDate || '',
            });
          }
        }
      });
    }
  }

  setRepostBlogs = (blogName, isChecked) => {
    let postRepostBlogNames = this.state.postRepostBlogNames;

    if (isChecked) {
      postRepostBlogNames.push(blogName);
    } else {
      const index = postRepostBlogNames.indexOf(blogName);
      postRepostBlogNames = [
        ...postRepostBlogNames.slice(0, index),
        ...postRepostBlogNames.slice(index + 1)
      ];
    }
    this.setState({postRepostBlogNames});
  }

  submitRepostedBlogs = () => {
    const publishData = {
      postRepostBlogNames: this.state.postRepostBlogNames,
      publishRegion: this.state.publishRegion,
      postDate: this.state.postDate,
    };

    this.props.base.update(
      'posts/' + this.state.id,
      {
        data: {publishData},
        then: () => {
          this.setState({snackbarOpen: true});
        }
      }
    );
  }

  handleSnackbarClose = () => {
    this.setState({snackbarOpen: false});
  }

  render() {
    return (
      <div style={styles.bodyContent}>
        <Snackbar
          open={this.state.snackbarOpen}
          message="Data Saved Successfully"
          autoHideDuration={5000}
          onRequestClose={this.handleSnackbarClose}
        />
        <RepostBlogsOptions 
          setRepostBlogs={this.setRepostBlogs}
          repostBlogs={this.state.postRepostBlogNames}
          blogName={this.state.blogName}
          submitRepostedBlogs={this.submitRepostedBlogs}
        />
      </div>
    );
  }
}

export default Difundir;
