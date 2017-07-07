import React from 'react';
import jquery from 'jquery';
import moment from 'moment-timezone';
import Snackbar from 'material-ui/Snackbar';

import RepostSiteOptions from '../components/Editor/Difundir/RepostSiteOptions';
import RepublishScheduler from '../components/Editor/Difundir/RepublishScheduler';

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
      postId: '',
      postRepostBlogNames: [],
      postDate: '',
      publishRegion: [],
      blogName: '',
      snackbarOpen: false,
      snackbarMessage: ''
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
      this.props.base.fetch('posts', {
        context: this,
        asArray: true,
        queries: {
          orderByChild: 'status',
          equalTo: 'publish'
        },
        then(data) {
          if (data != null) {
            let scheduledPosts = {};
            data.forEach(result => {
              let formatDate = moment(result.publishData.postDate, 'DD/MM/YYYY H:00:00').format('YYYY-MM-DD H:00:00');
              scheduledPosts[formatDate] = {'id' : result.id, 'status': result.status, 'date': result.date, 'title' : result.title};
            });

            this.setState({
              futureProgrammedPosts: scheduledPosts,
              buttonDisabled: false
            });
          }
        }
      });

      this.props.base.fetch('posts/' + this.postname, {
        context: this,
        then(data) {
          if (data.hasOwnProperty('id')) {
            this.setState({
              id: data.id,
              postRepostBlogNames: data.publishData.postRepostBlogNames || [],
              publishRegion: data.publishData.publishRegion || '',
              postDate: data.publishData.postDate || '',
              postId: data.publishData.postId,
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
      postId: this.state.postId,
    };

    const backendData = {
      postform: {
        postRepostBlogNames:this.state.postRepostBlogNames,
        postId: this.state.postId,
      }
    };

    jquery.ajax({
      url: `${this.state.blogUrl}/admin/postsrepostings.json`,
      type: 'post',
      dataType: 'json',
      data: backendData,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true
    }).done(result => {
      if (result.id != undefined) {
        this.props.base.update(
          'posts/' + this.state.id,
          {
            data: {publishData},
            then: () => {
              this.showSnackbarMsg('Data Saved Successfully');
            }
          }
        );
      } else {
        this.showSnackbarMsg('Something Went Wrong.');
      }
    });
  }

  showSnackbarMsg = (snackbarMessage) => {
    this.setState(
      {
        snackbarOpen: true,
        snackbarMessage
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
          message={this.state.snackbarMessage}
          autoHideDuration={5000}
          onRequestClose={this.handleSnackbarClose}
        />
        <RepostSiteOptions
          setRepostBlogs={this.setRepostBlogs}
          repostBlogs={this.state.postRepostBlogNames}
          blogName={this.state.blogName}
          submitRepostedBlogs={this.submitRepostedBlogs}
        />
        <RepublishScheduler
          postDate={this.state.postDate}
          futureProgrammedPosts={this.state.futureProgrammedPosts}
        />
      </div>
    );
  }
}

export default Difundir;
