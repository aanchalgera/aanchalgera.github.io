import React from 'react';
import jquery from 'jquery';
import moment from 'moment-timezone';
import { Snackbar, RaisedButton } from 'material-ui';

import RepostSiteOptions from '../components/Editor/Difundir/RepostSiteOptions';
import { SchedulePost } from '../components/Editor/Publish/SchedulePost';
import configParams from '../config/configs';
import { getPost } from './lib/service';

moment.tz.setDefault(configParams.timezone);
const VALID_DATE_WARNING = 'Please select a valid date, future date';

class Difundir extends React.Component {
  state = {
    id: '',
    postId: '',
    postRepostBlogNames: [],
    postDate: '',
    publishRegion: [],
    snackbarOpen: false,
    snackbarMessage: ''
  };

  componentWillMount() {
    this.init();
  }

  init() {
    getPost(this.props.postname, this.props.base).then(data => {
      if (data.hasOwnProperty('id')) {
        this.setState({
          id: data.id,
          postRepostBlogNames: data.publishData.postRepostBlogNames || [],
          publishRegion: data.publishData.publishRegion || '',
          postDate: data.publishData.postDate || '',
          postId: data.publishData.postId
        });
      }
    });
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
    this.setState({ postRepostBlogNames });
  };

  submitRepostedBlogs = () => {
    const publishData = {
      postRepostBlogNames: this.state.postRepostBlogNames,
      publishRegion: this.state.publishRegion,
      postDate: this.state.postDate,
      postId: this.state.postId
    };

    const backendData = {
      postform: {
        postRepostBlogNames: this.state.postRepostBlogNames,
        postId: this.state.postId
      }
    };

    jquery
      .ajax({
        url: `${this.props.blogUrl}/admin/postsrepostings.json`,
        type: 'post',
        dataType: 'json',
        data: backendData,
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true
      })
      .done(result => {
        if (result.id !== undefined) {
          this.props.base.update('posts/' + this.state.id, {
            data: { publishData },
            then: () => {
              this.showSnackbarMsg('Data Saved Successfully');
            }
          });
        } else {
          this.showSnackbarMsg('Something Went Wrong.');
        }
      });
  };

  showSnackbarMsg = snackbarMessage => {
    this.setState({
      snackbarOpen: true,
      snackbarMessage
    });
  };

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  onRepublishSchedule = (date, postSchedule) => {
    const republishInterval = 0;
    jquery
      .ajax({
        url: `${this.props.blogUrl}/admin/republish/schedule/${this.state
          .postId}`,
        type: 'POST',
        dataType: 'json',
        data: {
          date: date,
          republish_interval: republishInterval
        },
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true
      })
      .done(data => {
        if ('already_scheduled' === data.status) {
          return this.showSnackbarMsg(
            `Post already scheduled to republish at ${data.date}`
          );
        }
        this.showSnackbarMsg(
          `Post successfully scheduled to republish at  ${date}`
        );
      })
      .fail(() => {
        return this.showSnackbarMsg(
          'Error occured while republishing. Please try again'
        );
      })
      .always(postSchedule);
  };

  onInvalidDate = () => {
    this.showSnackbarMsg(VALID_DATE_WARNING);
  };

  onRepublishNow = () => {
    jquery
      .ajax({
        url: `${this.props.blogUrl}/admin/overlay/republish/${this.state
          .postId}`,
        type: 'POST',
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true
      })
      .done(() => {
        this.showSnackbarMsg('Post successfully republished again');
      })
      .fail(() => {
        return this.showSnackbarMsg(
          'Error occured while republishing. Please try again'
        );
      });
  };

  render() {
    return (
      <div>
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          autoHideDuration={5000}
          onRequestClose={this.handleSnackbarClose}
        />
        <RepostSiteOptions
          setRepostBlogs={this.setRepostBlogs}
          repostBlogs={this.state.postRepostBlogNames}
          blogName={this.props.blogName}
          submitRepostedBlogs={this.submitRepostedBlogs}
        />
        <SchedulePost
          value={moment().add(1, 'hours').format('DD/MM/YYYY HH:00')}
          base={this.props.base}
          onSchedule={this.onRepublishSchedule}
          onInvalidDate={this.onInvalidDate}
        />
        <RaisedButton
          label="PASAR POR PORTADA AHORA MISMO!"
          secondary={true}
          onTouchTap={this.onRepublishNow}
        />
      </div>
    );
  }
}

export default Difundir;
