import React from 'react';
import moment from 'moment-timezone';
import { Snackbar, RaisedButton } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';

import RepostSiteOptions from '../components/Editor/Difundir/RepostSiteOptions';
import { SchedulePost } from '../components/Editor/Publish/SchedulePost';
import configParams from '../config/configs';
import {
  getPost,
  updatePost,
  submitRepostedBlogsToBackend,
  republishPostNow,
  republishSchedule
} from './lib/service';
import { toggleItem } from '../components/Editor/Publish/lib/publishHelpers';

moment.tz.setDefault(configParams.timezone);
const VALID_DATE_WARNING = 'Please select a valid date, future date';
const POST_REPUBLISHED = 'Post successfully republished again';
const ERROR = 'Something went wrong';
const ALREADY_SCHEDULED = 'Post already scheduled to republish at ';
const REPUBLISHED = 'Post successfully scheduled to republish at  ';

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
        this.props.handleDifundir(data.status);
      }
    });
  }

  setRepostBlogs = (blogName, isChecked) => {
    let postRepostBlogNames = this.state.postRepostBlogNames;
    toggleItem(blogName, postRepostBlogNames);
    this.setState({ postRepostBlogNames });
  };

  submitRepostedBlogs = async () => {
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

    try {
      await submitRepostedBlogsToBackend(backendData, this.props.blogUrl);
      await updatePost(this.state.id, this.props.base, publishData);
      this.showSnackbarMsg('Data Saved Successfully');
    } catch (err) {
      this.showSnackbarMsg('Something Went Wrong.');
    }
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

  onRepublishSchedule = async (date, postSchedule) => {
    try {
      const data = await republishSchedule(
        this.props.blogUrl,
        this.state.postId,
        date
      );
      if ('already_scheduled' === data.status) {
        this.showSnackbarMsg(ALREADY_SCHEDULED + data.date);
      } else {
        this.showSnackbarMsg(REPUBLISHED + date);
      }
    } catch (error) {
      this.showSnackbarMsg(ERROR);
    }
  };

  onInvalidDate = () => {
    this.showSnackbarMsg(VALID_DATE_WARNING);
  };

  onRepublishNow = async () => {
    try {
      await republishPostNow(this.props.blogUrl, this.state.postId);
      this.showSnackbarMsg(POST_REPUBLISHED);
    } catch (error) {
      this.showSnackbarMsg(ERROR);
    }
  };

  render() {
    return (
      <div className="grid-wrapper grid-l">
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
        <Row>
          <Col xs={6}>
            <SchedulePost
              value={moment().add(1, 'hours').format('DD/MM/YYYY HH:00')}
              base={this.props.base}
              onSchedule={this.onRepublishSchedule}
              onInvalidDate={this.onInvalidDate}
            />
          </Col>
          <Col xs={4} />
          <Col xs={2}>
            <RaisedButton
              label="PASAR POR PORTADA AHORA MISMO!"
              secondary={true}
              onTouchTap={this.onRepublishNow}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Difundir;
