import React from 'react';
import jquery from 'jquery';
import moment from 'moment-timezone';
import Snackbar from 'material-ui/Snackbar';

import RepostSiteOptions from '../components/Editor/Difundir/RepostSiteOptions';
import { SchedulePost } from '../components/Editor/Publish/SchedulePost';
import RaisedButton from 'material-ui/RaisedButton';
import configParams from '../config/configs.js';

const styles = {
  bodyContent: {
    padding: '24px',
  }
};
moment.tz.setDefault(configParams.timezone);
const VALID_DATE_WARNING = 'Please select a valid date, future date';

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

  onRepublishSchedule(date, postSchedule) {
    const republishInterval = 0;
    jquery.ajax({
      url: `${this.state.blogUrl}/admin/republish/schedule/${this.state.postId}`,
      type: 'POST',
      dataType: 'json',
      data: {
        date: date,
        republish_interval: republishInterval,
      },
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
    })
    .done(data => {
      if ('already_scheduled' == data.status) {
        return this.showSnackbarMsg(`Post already scheduled to republish at ${data.date}`);
      }
      this.showSnackbarMsg(`Post successfully scheduled to republish at  ${date}`);
    })
    .fail(() => {
      return this.showSnackbarMsg('Error occured while republishing. Please try again');
    })
    .always(postSchedule);
  }

  onInvalidDate() {
    this.showSnackbarMsg(VALID_DATE_WARNING);
  }

  onRepublishNow() {
    jquery.ajax({
      url: `${this.state.blogUrl}/admin/overlay/republish/${this.state.postId}`,
      type: 'POST',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
    })
    .done(() => {
      this.showSnackbarMsg('Post successfully republished again');
    })
    .fail(() => {
      return this.showSnackbarMsg('Error occured while republishing. Please try again');
    });
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
        <SchedulePost
          value={moment().add(1, 'hours').format('DD/MM/YYYY HH:00')}
          base={this.props.base}
          onSchedule={this.onRepublishSchedule.bind(this)}
          onInvalidDate={this.onInvalidDate.bind(this)}
        />
        <RaisedButton label="PASAR POR PORTADA AHORA MISMO!" secondary={true} onTouchTap={this.onRepublishNow.bind(this)} />
      </div>
    );
  }
}

export default Difundir;
