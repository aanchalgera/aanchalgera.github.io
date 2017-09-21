// @flow
import React from 'react';
import moment from 'moment-timezone';
import { Snackbar, RaisedButton } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';

import RepostSiteOptions from '../components/Editor/Difundir/RepostSiteOptions';
import { SchedulePost } from '../components/Editor/Publish/SchedulePost';
import configParams from '../config/configs';
import {
  updatePost,
  submitRepostedBlogsToBackend,
  republishPostNow,
  republishSchedule
} from './lib/service';
import { toggleItem } from '../components/Editor/Publish/lib/publishHelpers';

moment.tz.setDefault(configParams.timezone);

const POST_REPUBLISHED = 'Post successfully republished again';
const ERROR = 'Something went wrong';
const ALREADY_SCHEDULED = 'Post already scheduled to republish at ';
const REPUBLISHED = 'Post successfully scheduled to republish at  ';

type Props = {
  base: Object,
  post: Object,
  blogUrl: string,
  blogName: string,
  handleDifundir: (status: string) => void
};

class Difundir extends React.Component {
  state = {
    id: '',
    postId: '',
    postRepostBlogNames: [],
    publishedDate: moment().add(1, 'hours').format('DD/MM/YYYY HH:00'),
    publishRegion: [],
    snackbarOpen: false,
    snackbarMessage: ''
  };
  props: Props;
  componentWillMount() {
    this.init();
  }

  init() {
    const data = this.props.post;
    if (data.hasOwnProperty('id')) {
      this.setState({
        id: data.id,
        postRepostBlogNames: data.publishData.postRepostBlogNames || [],
        publishRegion: data.publishData.publishRegion || [],
        postId: data.publishData.postId
      });
    }
  }

  setRepostBlogs = (blogName: string, isChecked: boolean) => {
    let postRepostBlogNames = this.state.postRepostBlogNames;
    toggleItem(blogName, postRepostBlogNames);
    this.setState({ postRepostBlogNames });
  };

  submitRepostedBlogs = async () => {
    const publishData = {
      postRepostBlogNames: this.state.postRepostBlogNames,
      publishRegion: this.state.publishRegion
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

  showSnackbarMsg = (snackbarMessage: string) => {
    this.setState({
      snackbarOpen: true,
      snackbarMessage
    });
  };

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  onRepublishSchedule = async () => {
    try {
      const data = await republishSchedule(
        this.props.blogUrl,
        this.state.postId,
        this.state.publishedDate
      );
      if ('already_scheduled' === data.status) {
        this.showSnackbarMsg(ALREADY_SCHEDULED + data.date);
      } else {
        this.showSnackbarMsg(REPUBLISHED + this.state.publishedDate);
      }
    } catch (error) {
      this.showSnackbarMsg(ERROR);
    }
  };

  updateParent = (data: Object) => {
    this.setState(data);
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
          <Col xs={5}>
            <SchedulePost
              date={this.state.publishedDate}
              base={this.props.base}
              onSchedule={this.onRepublishSchedule}
              updateParent={this.updateParent}
            />
          </Col>
          <Col xs={1}>
            <RaisedButton
              label="PROGRAMAR"
              onClick={this.onRepublishSchedule}
              primary={true}
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
